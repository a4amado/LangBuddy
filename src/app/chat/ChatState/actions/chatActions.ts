import { createAsyncThunk } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { client } from "~/trpc/fetch";

export const fetchNonExistingChat = createAsyncThunk(
    "chats/fetchNonExistingChat",
    async (action: PayloadAction<{ chat_id: string }>) => {
        const new_chat = await client.chat.getChatById.query({ chatId: action.payload.chat_id });
        console.log(new_chat);
        return new_chat;
    },
);
