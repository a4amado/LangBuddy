import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { db } from "~/server/db";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1).max(100),
        content: z.string().min(1).max(500),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return db.post.create({
        data: {
          title: input.title,
          content: input.content,
          
          createdById:ctx.session.user.id,
        },
      });
    }),

  delete: protectedProcedure
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
    }),

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
});
