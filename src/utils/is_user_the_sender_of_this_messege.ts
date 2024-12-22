import { db } from "~/server/db";

export const is_user_the_sender_of_this_messege = ({
    messege_id,
    user_id,
}: {
    messege_id: string;
    user_id: string;
}) =>
    db.chatMessege.findFirst({
        where: {
            AND: [
                {
                    id: messege_id,
                },
                {
                    sender_id: user_id,
                },
            ],
        },
        select: {
            id: true,
        },
    });
