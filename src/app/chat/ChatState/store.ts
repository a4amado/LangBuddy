import { inferRouterOutputs } from "@trpc/server";
import { configureStore, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppRouter } from "~/server/api/root";
type AppOutput = inferRouterOutputs<AppRouter>;

const initialState: AppOutput["chat"]["initialChats"] = {
    state: "loading",
    chats: [],
    messages: {},
    active: "",
};

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
    },
});

export const store = configureStore({
    reducer: chatSlice.reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const { init, switch: switchChat } = chatSlice.actions;
