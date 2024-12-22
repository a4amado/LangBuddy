import { db } from "~/server/db";

export async function getSingleChat(chatId: string, userId: string) {
    return await db.chat.findFirst({
        where: {
            id: chatId,
            ChatMember: {
                some: { user_id: userId },
            },
        },
        include: {
            ChatMember: true,
            lastMessege: true,
            ChatMessege: {
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
}
