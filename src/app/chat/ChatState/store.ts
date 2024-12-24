import { inferRouterOutputs } from "@trpc/server";
import { configureStore, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppRouter } from "~/server/api/root";
type AppOutput = inferRouterOutputs<AppRouter>;

type State = "loading" | "idel";
const initialState: AppOutput["chat"]["getAll"] & { state: State } = {
    state: "loading",
    chats: [],
    messages: {},
    active: "",
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
                state.messages[chatId].push(action.payload);

                // Update chat's last message
                if (state?.chats[chatIndex]) {
                    // @ts-ignore
                    state.chats[chatIndex] = {
                        ...state.chats[chatIndex],
                        lastMessage: { ...action.payload },
                    };
                }
                console.log(action.payload);
            }
        },
    },
});

export const store = configureStore({
    reducer: chatSlice.reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const { init, switch: switchChat, addNewMessage } = chatSlice.actions;
