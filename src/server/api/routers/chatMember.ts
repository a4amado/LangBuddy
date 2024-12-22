import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const chatMemberRouter = createTRPCRouter({
    // Get members of a chat
    getMembers: protectedProcedure.input(z.string()).query(async ({ ctx, input: chatId }) => {
        const members = await ctx.db.chatMember.findMany({
            where: {
                chat_id: chatId,
            },
            include: {
                user: true,
            },
        });

        return members;
    }),

    // Leave a chat
    leaveChat: protectedProcedure
        .input(z.object({ chatId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const chat = await ctx.db.chat.update({
                where: { id: input.chatId },
                data: {
                    users: {
                        disconnect: { id: ctx.session.user.id },
                    },
                    ChatMember: {
                        delete: {
                            chat_id_user_id: {
                                chat_id: input.chatId,
                                user_id: ctx.session.user.id,
                            },
                        },
                    },
                },
            });

            return chat;
        }),

    // Add members to chat
    addMembers: protectedProcedure
        .input(
            z.object({
                chatId: z.string(),
                userIds: z.array(z.string()),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            // Check if the current user is a member of the chat
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

            // Check for blocked users
            const blockedUsers = await ctx.db.blocked.findMany({
                where: {
                    OR: [
                        {
                            user_1_id: { in: input.userIds },
                            user_2_id: ctx.session.user.id,
                        },
                        {
                            user_1_id: ctx.session.user.id,
                            user_2_id: { in: input.userIds },
                        },
                    ],
                },
            });

            if (blockedUsers.length > 0) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "Cannot add blocked users to chat",
                });
            }

            // Add new members
            const updatedChat = await ctx.db.chat.update({
                where: { id: input.chatId },
                data: {
                    users: {
                        connect: input.userIds.map((id) => ({ id })),
                    },
                    ChatMember: {
                        createMany: {
                            data: input.userIds.map((id) => ({
                                user_id: id,
                            })),
                        },
                    },
                },
                include: {
                    users: true,
                    ChatMember: {
                        include: {
                            user: true,
                        },
                    },
                },
            });

            return updatedChat;
        }),

    // Remove members from chat
    removeMembers: protectedProcedure
        .input(
            z.object({
                chatId: z.string(),
                userIds: z.array(z.string()),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            // Check if the current user is a member of the chat
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

            // Remove members
            const updatedChat = await ctx.db.chat.update({
                where: { id: input.chatId },
                data: {
                    users: {
                        disconnect: input.userIds.map((id) => ({ id })),
                    },
                    ChatMember: {
                        deleteMany: input.userIds.map((id) => ({
                            chat_id: input.chatId,
                            user_id: id,
                        })),
                    },
                },
                include: {
                    users: true,
                    ChatMember: {
                        include: {
                            user: true,
                        },
                    },
                },
            });

            return updatedChat;
        }),
});
