import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { is_user_a_part_of_this_chat } from "~/utils/is_user_a_part_of_this_chat";
import { TRPCError } from "@trpc/server";
import { db } from "~/server/db";
import { pusher } from "~/lib/pusher";

const MessageSchema = z.object({
    chatId: z.string(),
    content: z.string().min(1),
});

export const sendMessage = protectedProcedure
    .input(MessageSchema)
    .mutation(async ({ ctx, input }) => {
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
    });
