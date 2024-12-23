import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { is_user_the_sender_of_this_messege } from "~/utils/is_user_the_sender_of_this_messege";
import { db } from "~/server/db";
import { pusher } from "~/server/pusher/client";
import { is_user_a_part_of_this_chat } from "~/utils/is_user_a_part_of_this_chat";

export const messageRouter = createTRPCRouter({
    getMessegeById: protectedProcedure
        .input(
            z.object({
                chat_id: z.string().cuid(),
                id: z.string().cuid(),
            }),
        )
        .query(async ({ input: { chat_id, id }, ctx: { session } }) => {
            if (!is_user_a_part_of_this_chat({ chat_id, user_id: session.user.id })) {
                return new TRPCError({ code: "FORBIDDEN" });
            }

            return db.message.findFirst({
                where: {
                    id: id,
                    chatId: chat_id,
                },
            });
        }),

    // Get messages for a chat
    getMessages: protectedProcedure
        .input(
            z.object({
                chatId: z.string(),
                take: z.number().min(1).max(50).default(20),
                skip: z.number().default(0),
            }),
        )
        .query(async ({ ctx: { session }, input: { chatId, skip, take } }) => {
            if (!is_user_a_part_of_this_chat({ chat_id: chatId, user_id: session.user.id })) {
                return new TRPCError({ code: "FORBIDDEN" });
            }

            const messages = await db.message.findMany({
                where: {
                    chatId: chatId,
                },
                include: {
                    sender: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
                take: take ?? 50,
                skip: skip ?? 0,
            });

            return messages;
        }),

    // Send a message
    send: protectedProcedure
        .input(
            z.object({
                chatId: z.string(),
                content: z.string(),
            }),
        )
        .mutation(async ({ ctx: { session }, input: { chatId, content } }) => {
            // Check if user is member of chat

            if (!is_user_a_part_of_this_chat({ chat_id: chatId, user_id: session.user.id })) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "You are not a member of this chat",
                });
            }

            const message = await db.message.create({
                data: {
                    content: content,
                    senderId: session.user.id,
                    chatId: chatId,
                },

                include: {
                    sender: {
                        select: {
                            id: true,
                            image: true,
                            name: true,
                        },
                    },
                },
            });

            const users = await db.chatMember.findMany({
                where: {
                    chatId: chatId,
                },
                select: { userId: true },
            });

            users.forEach(({ userId }) => {
                if (userId != session.user.id) {
                    pusher.trigger(userId, "new_msg", message);
                }
            });

            // Update chat's last message and updatedAt
            await db.chat.update({
                where: { id: chatId },
                data: {
                    lastMessage: {
                        connect: { id: message.id },
                    },
                    updatedAt: new Date(),
                },
            });

            return message;
        }),
    edit: protectedProcedure
        .input(
            z.object({
                messege_id: z.string().cuid(),
                content: z.string(),
            }),
        )
        .mutation(async (opts) => {
            const this_msg = await is_user_the_sender_of_this_messege({
                messege_id: opts.input.messege_id,
                user_id: opts.ctx.session.user.id,
            });
            if (!this_msg?.id) {
                return new TRPCError({
                    code: "FORBIDDEN",
                    message: "not the sender of the messege",
                });
            }

            const edited_messege = await db.message.update({
                data: {
                    content: opts.input.content,
                },
                where: {
                    id: opts.input.messege_id,
                },
            });
            return edited_messege;
        }),
    delete: protectedProcedure
        .input(
            z.object({
                messege_id: z.string().cuid(),
            }),
        )
        .mutation(async ({ ctx: { session }, input }) => {
            const this_msg = await is_user_the_sender_of_this_messege({
                messege_id: input.messege_id,
                user_id: session.user.id,
            });
            if (!this_msg?.id) {
                return new TRPCError({
                    code: "FORBIDDEN",
                    message: "not the sender of the messege",
                });
            }

            const deleted_messege = await db.message.delete({
                where: {
                    id: input.messege_id,
                },
            });
            return deleted_messege;
        }),
});
