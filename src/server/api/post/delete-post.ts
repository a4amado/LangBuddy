import { z } from "zod";
import { protectedProcedure } from "../trpc";
import { db } from "~/server/db";
import { TRPCError } from "@trpc/server";

export const deletePost = protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
        const post = await db.post.findUnique({
            where: { id: input.id },
        });

        if (!post || post.createdById !== ctx.session.user.id) {
            throw new TRPCError({
                code: "FORBIDDEN"
            });
        }

        console.log("update");
        

        return db.post.update({
            where: { id: input.id },
            data: {
                createdById: null
            }
        });
    });
