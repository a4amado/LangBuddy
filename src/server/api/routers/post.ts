import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { db } from "~/server/db";

import { createPost } from "../post/create-post";
import { deletePost } from "../post/delete-post";
import { getPostBySlug } from "../post/get-post-by-slug";
import { updatePost } from "../post/edit-post";
export const postRouter = createTRPCRouter({
    create: createPost,
    delete: deletePost,
    edit: updatePost,

    getInfinitePosts: publicProcedure
        .input(
            z.object({
                limit: z.number().min(1).max(100).default(10),
                cursor: z.string().optional(),
            }),
        )
        .query(async ({ ctx, input }) => {
            const { limit, cursor } = input;

            const posts = await db.post.findMany({
                take: limit + 1,
                cursor: cursor ? { id: cursor } : undefined,
                orderBy: { createdAt: "desc" },
                include: {
                    createdBy: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                        },
                    },
                },
            });

            let nextCursor: typeof cursor | undefined = undefined;
            if (posts.length > limit) {
                const nextItem = posts.pop();
                nextCursor = nextItem?.id;
            }

            return {
                items: posts,
                nextCursor,
            };
        }),
    getBySlug: getPostBySlug,
});
