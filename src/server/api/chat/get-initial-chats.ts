import { db } from "~/server/db";

export async function getgetAll(userId: string) {
    const chats = await db.chat.findMany({
        where: {
            members: {
                some: {
                    userId: userId,
                },
            },
        },
        orderBy: {
            lastMessage: { createdAt: "desc" },
        },
        take: 100,
        include: {
            members: {
                select: {
                    user: {
                        select: {
                            name: true,
                            id: true,
                            image: true,
                        },
                    },
                },
            },
            lastMessage: {
                include: {
                    sender: {
                        select: {
                            name: true,
                            id: true,
                            image: true,
                        },
                    },
                },
            },
            messages: {
                orderBy: { createdAt: "asc" },
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

    type ChatType = typeof chats;

    const state = {
        chats: chats.map((chat) => {
            // Create a new object without ChatMessage
            const { messages, ...chatWithoutMessages } = chat;
            return chatWithoutMessages;
        }),
        messages: {} as Record<string, ChatType[number]["messages"]>,
        state: "idel",
        active: "",
    };

    // Populate messages separately
    chats.forEach((chat) => {
        if (chat.id) {
            state.messages[chat.id] = chat.messages;
        }
    });

    state.active = chats ? (chats[0]?.id as string) : "";
    return state;
}
