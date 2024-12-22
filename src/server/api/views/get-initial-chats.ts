import { db } from "~/server/db";

export async function getInitialChats(userId: string) {
    const chats = await db.chat.findMany({
        where: {
            ChatMember: {
                some: {
                    user_id: userId,
                },
            },
        },
        orderBy: {
            lastMessege: { createdAt: "desc" },
        },
        take: 100,
        include: {
            ChatMember: {
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
            lastMessege: {
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
            ChatMessege: {
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
            const { ChatMessege, ...chatWithoutMessages } = chat;
            return chatWithoutMessages;
        }),
        messages: {} as Record<string, ChatType[number]["ChatMessege"]>,
        state: "idel",
        active: "",
    };

    // Populate messages separately
    chats.forEach((chat) => {
        if (chat.id) {
            state.messages[chat.id] = chat.ChatMessege;
        }
    });

    state.active = chats ? (chats[0]?.id as string) : "";
    return state;
}
