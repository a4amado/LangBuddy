import { z } from "zod";
import { protectedProcedure } from "../trpc";
import { db } from "~/server/db";

export const createComment = protectedProcedure
    .input(
        z.object({
            post_id: z.string().cuid(),
            content: z.string(),
        }),
    )
    .mutation(async ({ ctx, input }) => {
        return db.comment.create({
            data: {
                postId: input.post_id,
                createdById: ctx.session.user.id,
                content: input.content,
            },
        });
    });
