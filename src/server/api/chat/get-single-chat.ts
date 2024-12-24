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

            return await db.chat.findFirst({
                where: {
                    id: input.chatId,
                    members: {
                        some: { userId: input.chatId },
                    },
                },
                include: {
                    members: true,
                    lastMessage: true,
                    messages: {
                        orderBy: { createdAt: "desc" },
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
        },
    );
