import { z } from "zod";
import { publicProcedure } from "../trpc";
import { db } from "~/server/db";

export const getPostBySlug = publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async (opts) => {
        return db.post.findUnique({
            where: {
                slug: opts.input.slug,
            },
            include: {
                createdBy: {
                    select: {
                        name: true,
                        id: true,
                        image: true,
                    },
                },
                Comment: {
                    include: {
                        createdBy: { select: { image: true, name: true, id: true } },
                    },
                },
            },
        });
    });
