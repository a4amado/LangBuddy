import { db } from "~/server/db";

export const is_user_a_part_of_this_chat = ({
    chat_id,
    user_id,
}: {
    chat_id: string;
    user_id: string;
}) =>
    db.chatMember.findFirst({
        where: {
            AND: [
                {
                    chatId: chat_id,
                },
                {
                    userId: user_id,
                },
            ],
        },
        select: {
            chatId: true,
        },
    });
