import { z } from "zod";
import { protectedProcedure } from "../trpc";
import { db } from "~/server/db";

export const deletePost = protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
        const post = await db.post.findUnique({
            where: { id: input.id },
        });

        if (!post || post.createdById !== ctx.session.user.id) {
            throw new Error("Not authorized");
        }

        return db.post.delete({
            where: { id: input.id },
        });
    });
