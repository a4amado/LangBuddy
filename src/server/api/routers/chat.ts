import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { pusher } from "~/lib/pusher";
import { is_user_a_part_of_this_chat } from "~/utils/is_user_a_part_of_this_chat";
import { TRPCError } from "@trpc/server";
import { db } from "~/server/db";
import { getChatById } from "../chat/get-single-chat";
import { createChat } from "../chat/create-new-chat";

const MessageSchema = z.object({
    chatId: z.string(),
    content: z.string().min(1),
});

const ChatSchema = z.object({
    userId: z.string(),
    type: z.enum(["DIRECT", "GROUP"]).default("DIRECT"),
    name: z.string().optional(),
});

export const chatRouter = createTRPCRouter({
    create: createChat,
    getAll: protectedProcedure.query(async ({ ctx }) => {
        const chats = await db.chat.findMany({
            where: {
                members: {
                    some: {
                        userId: ctx.session.user.id,
                    },
                },
            },
            include: {
                members: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                image: true,
                            },
                        },
                    },
                },
                messages: {
                    take: 50,
                    orderBy: {
                        createdAt: "desc",
                    },
                    include: {
                        sender: {
                            select: {
                                id: true,
                                name: true,
                                image: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                updatedAt: "desc",
            },
        });

        type ChatType = typeof chats;

        // Shape for Redux state
        const state = {
            state: "idle",
            chats: chats.map((chat) => ({
                id: chat.id,
                type: chat.type,
                members: chat.members.map((member) => member.user),
                lastMessage: chat.messages[0] || null,
                updatedAt: chat.updatedAt,
            })),
            messages: {} as Record<string, ChatType[0]["messages"]>,
            active: "",
        };
        chats.forEach((val, idx) => {
            state.messages[val.id.toString()] = val.messages;
        });
        return state;
    }),

    getChatById: getChatById,

    sendMessage: protectedProcedure.input(MessageSchema).mutation(async ({ ctx, input }) => {
        if (
            !(await is_user_a_part_of_this_chat({
                chat_id: input.chatId,
                user_id: ctx.session.user.id,
            }))
        ) {
            throw new TRPCError({ code: "FORBIDDEN" });
        }

        const message = await db.message.create({
            data: {
                content: input.content,
                chatId: input.chatId,
                senderId: ctx.session.user.id,
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
            },
        });

        await db.chat.update({
            where: { id: input.chatId },
            data: {
                lastMessageId: message.id,
                updatedAt: new Date(),
            },
        });

        await pusher.trigger(`chat-${input.chatId}`, "new-message", message);
        return message;
    }),

});
