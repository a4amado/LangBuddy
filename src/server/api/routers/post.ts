import { procedureTypes } from "@trpc/server/unstable-core-do-not-import";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { createPost, schema$createPost } from "../views/post/create-post";
import { db } from "~/server/db";
import { editPost, schema$editPost } from "../views/post/edit-post";
import { deletePost, schema$deletePost } from "../views/post/delete-post";
import { z } from "zod";

export const postRoute = createTRPCRouter({
    create: protectedProcedure.input(schema$createPost).mutation(async (opts) => {
        return await createPost({
            ...opts.input,
            userID: opts.ctx.session.user.id,
        });
    }),
    delete: protectedProcedure.input(schema$deletePost).mutation(
        async (opts) =>
            await deletePost({
                ...opts.input,
                userID: opts.ctx.session.user.id,
            }),
    ),
    edit: protectedProcedure.input(schema$editPost).mutation(async (opts) => {
        return await editPost({
            ...opts.input,
            userID: opts.ctx.session.user.id,
        });
    }),
    view: publicProcedure
        .input(
            z.object({
                postId: z.string().cuid(),
            }),
        )
        .query(async ({ input: { postId } }) => {
            return await db.post.findUnique({
                where: { id: postId },
                include: {
                    createdBy: {
                        select: {
                            name: true,
                            id: true,
                            image: true,
                        },
                    },
                },
            });
        }),
    page: publicProcedure
        .input(z.object({ page: z.number().min(0).default(0) }))
        .query(async ({ input: { page } }) => {
            return await db.post.findMany({
                orderBy: { createdAt: "desc" },
                take: 15,
                skip: page * 15,
                include: {
                    createdBy: {
                        select: {
                            image: true,
                            name: true,
                            id: true,
                        },
                    },
                },
            });
        }),
});
