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
                    ChatMember: {
                        some: {
                            user_id: userId,
                        },
                    },
                },
                {
                    ChatMember: {
                        some: {
                            user_id: user2Id,
                        },
                    },
                },
                {
                    type: "CHAT", // Ensure it's a direct chat, not a group
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
                { chat_id: newChat.id, user_id: userId },
                { chat_id: newChat.id, user_id: user2Id },
            ],
        });

        return { chat_id: newChat.id };
    });

    return result;
}
