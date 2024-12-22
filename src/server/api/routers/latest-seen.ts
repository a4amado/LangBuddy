import { db } from "~/server/db";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const latestSeenRouter = createTRPCRouter({
    now: protectedProcedure.mutation(async (opts) => {
        return await db.user.update({
            where: { id: opts.ctx.session.user.id },
            data: {
                latestSeen: new Date(),
            },
        });
    }),
});
