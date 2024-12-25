import { TRPCError } from "@trpc/server";
import { db } from "~/server/db";
import { is_user_a_part_of_this_chat } from "~/utils/is_user_a_part_of_this_chat";
import { protectedProcedure } from "../trpc";
import { z } from "zod";

export const getChatById = protectedProcedure
    .input(
        z.object({
            chatId: z.string().cuid(),
        }),
    )
    .query(
        async ({
            input,
            ctx: {
                session: { user },
            },
        }) => {
            if (!(await is_user_a_part_of_this_chat({ chat_id: input.chatId, user_id: user.id }))) {
                return new TRPCError({ code: "FORBIDDEN" });
            }

            const chat = await db.chat.findFirst({
                where: {
                    id: input.chatId,
                },
                include: {
                    members: {
                        include: {
                            user: true,
                        },
                    },
                    lastMessage: {
                        include: {
                            sender: {
                                select: {
                                    name: true,
                                    id: true,
                                    image: true,
                                },
                            },
                        },
                    },
                    messages: {
                        orderBy: { createdAt: "asc" },
                        take: 100,
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
            });
            return {
                ...chat,
                members: chat?.members.map((e) => ({
                    id: e.user.id,
                    image: e.user.image,
                    name: e.user.name,
                })),
            };
        },
    );
