import { z } from "zod";
import { protectedProcedure } from "../trpc";
import { db } from "~/server/db";
import { title } from "node:process";

export const updatePost = protectedProcedure
    .input(z.object({ id: z.string(), content: z.string(), title: z.string().max(100) }))
    .mutation(async ({ ctx, input }) => {
        return db.post.update({
            where: { id: input.id, createdById: ctx.session.user.id },
            data: {
                content: input.content,
            },
        });
    });
