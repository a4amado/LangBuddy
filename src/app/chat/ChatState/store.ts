import { configureStore } from "@reduxjs/toolkit";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TRPCError } from "@trpc/server";
import { AppOutput, ChatState } from "./types";
import { fetchNonExistingChat } from "./actions/chatActions";

const initialState: ChatState = {
    state: "loading",
    chats: [],
    messages: {},
    active: "",
    isSideBarOpen: false,
};

const chatSlice = createSlice({
    initialState,
    name: "chats",
    reducers: {
        init: (state, action: PayloadAction<AppOutput["chat"]["getAll"]>) => {
            state.active = action.payload.chats[0]?.id || "";
            state.chats = action.payload.chats;
            state.messages = action.payload.messages;
            state.state = "idel";
        },
        switch: (state, action: PayloadAction<{ id: string }>) => {
            state.active = action.payload.id;
        },
        toggleSideBar: (state) => {
            state.isSideBarOpen = !state.isSideBarOpen;
        },
        addNewMessage: (
            state,
            action: PayloadAction<AppOutput["chat"]["getAll"]["messages"][0][0]>,
        ) => {
            const chatId = action.payload.chatId;
            const chatIndex = state.chats.findIndex((chat) => chat.id === chatId);

            if (chatIndex !== -1) {
                // Update messages
                if (!state.messages[chatId]) {
                    state.messages[chatId] = [];
                }
                state.messages[chatId] = [...state.messages[chatId], action.payload];
                console.log(state.messages[chatId]);

                // Update chat's last message
                if (state?.chats[chatIndex]) {
                    // @ts-ignore
                    state.chats[chatIndex] = {
                        ...state.chats[chatIndex],
                        lastMessage: { ...action.payload },
                    };
                }
                state.chats = JSON.parse(JSON.stringify(state.chats)).sort(
                    (
                        a: { lastMessage: { createdAt: any } },
                        b: { lastMessage: { createdAt: any } },
                    ) => {
                        const timeA = new Date(a.lastMessage?.createdAt ?? "").getTime();
                        const timeB = new Date(b.lastMessage?.createdAt ?? "").getTime();
                        return timeA - timeB;
                    },
                );
            }
        },
        loadMoreToState: (
            state,
            action: PayloadAction<AppOutput["messege"]["getMessagesByChatId"]>,
        ) => {
            if (
                !action.payload ||
                !state ||
                action.payload instanceof TRPCError ||
                !action.payload[0]
            )
                return;
            state.messages[action.payload[0].chatId] = [
                ...action.payload,
                // @ts-ignore
                ...state.messages[action.payload[0].chatId],
            ].sort((a, b) => {
                // Sort in descending order (newest first)
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();

                // Or for ascending order (oldest first), use:
                // return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            });
        },
        replaceMessege: (
            state,
            action: PayloadAction<{
                chatId: string;
                messegeId: string;
                replaceWith: AppOutput["messege"]["send"];
            }>,
        ) => {
            const idx = state.messages[action.payload.chatId]?.findIndex(
                (message) => message.id == action.payload.messegeId,
            ) as number;
            console.log("before", state.messages[action.payload.chatId]);

            // @ts-ignore
            state.messages[action?.payload?.chatId][idx] = action.payload.replaceWith;

            console.log("after", state.messages[action.payload.chatId]);
        },
    },
    extraReducers(builder) {
        builder.addCase(
            fetchNonExistingChat.fulfilled,
            (state, action: PayloadAction<AppOutput["chat"]["getChatById"]>) => {
                // Early return if no payload
                if (action.payload instanceof TRPCError) return;

                console.log(action);

                const payload = action.payload;

                // Update messages
                // @ts-ignore
                state.messages[payload.id] = payload.messages;

                // Update chats list - ensure no duplicates
                const chatExists = state.chats.some((chat) => chat.id === payload.id);
                if (!chatExists) {
                    // @ts-ignore
                    state.chats = [payload, ...state.chats];
                }

                // Set active chat
                // @ts-ignore
                state.active = payload.id;
            },
        );
    },
});

export const store = configureStore({
    reducer: chatSlice.reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const {
    init,
    switch: switchChat,
    addNewMessage,
    replaceMessege,
    toggleSideBar,
    loadMoreToState,
} = chatSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
