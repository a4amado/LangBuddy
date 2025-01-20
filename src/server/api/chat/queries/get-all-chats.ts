import { protectedProcedure } from "../../trpc";
import { db } from "~/server/db";

export const getAllChats = protectedProcedure.query(async ({ ctx }) => {
    const chats = await db.chat.findMany({
        where: {
            members: {
                some: {
                    userId: ctx.session.user.id,
                },
            },
        },
        include: {
            members: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                        },
                    },
                },
            },
            messages: {
                take: 50,
                orderBy: {
                    createdAt: "desc",
                },
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
        orderBy: {
            updatedAt: "desc",
        },
    });

    type ChatType = typeof chats;

    // Shape for Redux state
    const state = {
        state: "idle",
        chats: chats.map((chat) => ({
            id: chat.id,
            type: chat.type,
            members: chat.members.map((member) => member.user),
            lastMessage: chat.messages[0] || null,
            updatedAt: chat.updatedAt,
        })),
        messages: {} as Record<string, ChatType[0]["messages"]>,
        active: "",
    };

    chats.forEach((chat) => {
        state.messages[chat.id] = chat.messages;

        (state?.messages[chat.id ?? ""] ?? []).sort(
            (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
    });
    state.active = state.chats[0]?.id ?? "";
    return state;
});
