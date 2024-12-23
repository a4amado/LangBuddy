import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { db } from "~/server/db";
import { getInitialChats } from "../views/get-initial-chats";
import { getPaginatedChats, schema$getPaginatedChats } from "../views/get-paginated-chats";
import { getSingleChat } from "../views/get-single-chat";
import { createNewChat, schema$createNewChat } from "../views/create-new-chat";
import { api } from "~/trpc/server";

// Router Definition
export const chatRouter = createTRPCRouter({
    initialChats: protectedProcedure.query(async (opts) => {
        return await getInitialChats(opts.ctx.session.user.id);
    }),

    getChatById: protectedProcedure.input(z.object({ chatId: z.string() })).query(async (opts) => {
        return await getSingleChat(opts.input.chatId, opts.ctx.session.user.id);
    }),

    getChatsPaginated: protectedProcedure.input(schema$getPaginatedChats).query(async (opts) => {
        return await getPaginatedChats(
            opts.ctx.session.user.id,
            opts.input.offset,
            opts.input.limit,
        );
    }),

    createChat: protectedProcedure.input(schema$createNewChat).mutation(async ({ ctx, input }) => {
        return await createNewChat({
            userId: input.userId,
            user2Id: ctx.session.user.id,
        });
    }),
});
