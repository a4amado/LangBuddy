import { z } from "zod";
import { createTRPCRouter } from "../trpc";
import { getChatById } from "../chat/get-single-chat";
import { createChat } from "../chat/create-new-chat";
import { getAllChats } from "../chat/queries/get-all-chats";
import { sendMessage } from "../chat/queries/send-message";

const ChatSchema = z.object({
    userId: z.string(),
    type: z.enum(["DIRECT", "GROUP"]).default("DIRECT"),
    name: z.string().optional(),
});

export const chatRouter = createTRPCRouter({
    create: createChat,
    getAll: getAllChats,
    getChatById: getChatById,
    sendMessage: sendMessage,
});
