import { z } from "zod";
import { db } from "~/server/db";

export const schema$getPaginatedChats = z.object({
    offset: z.number().min(0),
    limit: z.number().min(1).max(100),
});

export async function getPaginatedChats(userId: string, offset: number, limit: number) {
    return await db.chat.findMany({
        where: {
            members: {
                some: { userId: userId },
            },
        },
        orderBy: {
            lastMessage: { createdAt: "desc" },
        },
        skip: offset,
        take: limit,
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
