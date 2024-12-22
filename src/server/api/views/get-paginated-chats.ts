import { z } from "zod";
import { db } from "~/server/db";

export const schema$getPaginatedChats = z.object({
    offset: z.number().min(0),
    limit: z.number().min(1).max(100),
});

export async function getPaginatedChats(userId: string, offset: number, limit: number) {
    return await db.chat.findMany({
        where: {
            ChatMember: {
                some: { user_id: userId },
            },
        },
        orderBy: {
            lastMessege: { createdAt: "desc" },
        },
        skip: offset,
        take: limit,
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
