import { z } from "zod";

export const schema$createNewChat = z.object({
    userId: z.string().cuid(),
});
import { db } from "~/server/db";

// Since zod is not available, we'll use TypeScript types instead
type CreateNewChatInput = {
    userId: string;
    user2Id: string;
};

export async function createNewChat({ userId, user2Id }: CreateNewChatInput) {
    // Check if a chat between these users already exists
    const existingChat = await db.chat.findFirst({
        where: {
            AND: [
                {
                    members: {
                        some: {
                            userId: userId,
                        },
                    },
                },
                {
                    members: {
                        some: {
                            userId: user2Id,
                        },
                    },
                },
                {
                    type: "DIRECT", // Ensure it's a direct chat, not a group
                },
            ],
        },
    });
    if (existingChat) {
        return { chat_id: existingChat.id };
    }

    // Create new chat and members in a transaction to ensure data consistency
    const result = await db.$transaction(async (tx) => {
        const newChat = await tx.chat.create({ data: {}, select: { id: true } });
        console.log(newChat);

        await tx.chatMember.createMany({
            data: [
                { chatId: newChat.id, userId: userId },
                { chatId: newChat.id, userId: user2Id },
            ],
        });

        return { chat_id: newChat.id };
    });

    return result;
}
