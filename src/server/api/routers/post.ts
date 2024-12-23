import { z } from "zod";
import { desc, eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1).max(100),
        content: z.string().min(1).max(500),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.post.create({
        data: {
          title: input.title,
          content: input.content,
          authorId: ctx.session.user.id,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.findUnique({
        where: { id: input.id },
      });

      if (!post || post.authorId !== ctx.session.user.id) {
        throw new Error("Not authorized");
      }

      return ctx.prisma.post.delete({
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

      const posts = await ctx.prisma.post.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { createdAt: "desc" },
        include: {
          author: {
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
