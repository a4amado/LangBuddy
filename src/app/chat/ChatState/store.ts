import { inferRouterOutputs } from "@trpc/server";
import { configureStore, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppRouter } from "~/server/api/root";
import { client } from "~/trpc/fetch";
type AppOutput = inferRouterOutputs<AppRouter>;

const initialState: AppOutput["chat"]["initialChats"] = {
    state: "loading",
    chats: [],
    messages: {},
    active: "",
};


export async function ssssssssssss(messege_id:string, chat_id:string) {
    const response = await client.message.getMessegeById.query({ chat_id, id:messege_id });
    console.log("res", response);
    
}
const chatSlice = createSlice({
    initialState,
    name: "chats",
    reducers: {
        init: (state, action: PayloadAction<AppOutput["chat"]["initialChats"]>) => {
            state.active = action.payload.active;
            state.chats = action.payload.chats;
            state.messages = action.payload.messages;
            state.state = action.payload.state;
        },
        switch: (state, action: PayloadAction<{ id: string }>) => {
            state.active = action.payload.id;
        },
        addNewMessage: (
            state,
            action: PayloadAction<AppOutput["chat"]["initialChats"]["messages"][0][0]>,
        ) => {
            const chatId = action.payload.chat_id;
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
                        lastMessege: { ...action.payload },
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
