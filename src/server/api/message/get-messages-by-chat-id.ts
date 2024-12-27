import { z } from "zod";
import { protectedProcedure } from "../trpc";
import { is_user_a_part_of_this_chat } from "~/utils/is_user_a_part_of_this_chat";
import { TRPCError } from "@trpc/server";
import { db } from "~/server/db";

export const getMessagesByChatId = protectedProcedure
    .input(
        z.object({
            chatId: z.string().cuid(),
            skip: z.number().min(0),
        }),
    )
    .query(async ({ ctx, input }) => {
        if (
            !(await is_user_a_part_of_this_chat({
                chat_id: input.chatId,
                user_id: ctx.session.user.id,
            }))
        ) {
            return new TRPCError({ code: "FORBIDDEN" });
        }

        return db.message.findMany({
            where: {
                chatId: input.chatId,
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
            orderBy: {
                createdAt: "desc",
            },
            skip: input.skip,
            take: 35,
        });
    });
