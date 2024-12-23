import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { is_user_the_sender_of_this_messege } from "~/utils/is_user_the_sender_of_this_messege";
import { db } from "~/server/db";
import { pusher } from "~/server/pusher/client";
import { is_user_a_part_of_this_chat } from "~/utils/is_user_a_part_of_this_chat";

export const messageRouter = createTRPCRouter({

    getMessegeById: protectedProcedure.input(z.object({
        chat_id: z.string().cuid(),
        id: z.string().cuid(),
    })).query(async (opts) => {

        return await db.chatMessege.findUnique({
            where: {
                id: opts.input.id
            }
        })
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
        .query(async ({ ctx, input }) => {
            // Check if user is member of chat
            const chat = await ctx.db.chat.findFirst({
                where: {
                    id: input.chatId,
                    ChatMember: {
                        some: {
                            user_id: ctx.session.user.id,
                        },
                    },
                },
            });

            if (!chat) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "You are not a member of this chat",
                });
            }

            const messages = await ctx.db.chatMessege.findMany({
                where: {
                    chat_id: input.chatId,
                },
                include: {
                    sender: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
                take: input.take,
                skip: input.skip,
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
        .mutation(async ({ ctx, input }) => {
            // Check if user is member of chat
            const chat = await ctx.db.chatMember.findFirst({
                where: {
                    user_id: ctx.session.user.id,
                    chat_id: input.chatId,
                },
            });
            if (!chat) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "You are not a member of this chat",
                });
            }

            const message = await ctx.db.chatMessege.create({
                data: {
                    content: input.content,
                    sender_id: ctx.session.user.id,
                    chat_id: input.chatId,
                },
                
                include :{
                    sender: {
                        select: {
                            id:true, image: true, name:true 
                        }
                    }
                }
            });

            pusher.trigger(ctx.session.user.id, "new_msg", message)

            // Update chat's last message and updatedAt
            await ctx.db.chat.update({
                where: { id: input.chatId },
                data: {
                    lastMessege: {
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

            const edited_messege = await db.chatMessege.update({
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

            const deleted_messege = await db.chatMessege.delete({
                where: {
                    id: opts.input.messege_id,
                },
            });
            return deleted_messege;
        }),
});
