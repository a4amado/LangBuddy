import { db } from "~/server/db";

export async function getSingleChat(chatId: string, userId: string) {
    return await db.chat.findFirst({
        where: {
            id: chatId,
            members: {
                some: { userId: userId },
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
}
