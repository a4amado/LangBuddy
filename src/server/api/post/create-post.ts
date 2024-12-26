import { db } from "~/server/db";
import { protectedProcedure } from "../trpc";
import { z } from "zod";
import slug from "slug";
import { randomUUID } from "crypto";

export const createPost = protectedProcedure
    .input(
        z.object({
            title: z.string().min(1).max(100),
            content: z.string().min(1).max(500),
            images: z.array(z.string().url().startsWith("https://utfs.io/"))
        }),
    )
    .mutation(async ({ ctx, input }) => {
        return db.post.create({
            data: {
                title: input.title,
                content: input.content,

                createdById: ctx.session.user.id,
                slug: slug(`${input.title}-${randomUUID()}`),
                images: input.images.join(",")
            },
        });
    });
