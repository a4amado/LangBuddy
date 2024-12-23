import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
    getById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            const user = await ctx.prisma.user.findUnique({
                where: { id: input.id },
                include: {
                    languages: true,
                    profile: true,
                },
            });

            if (!user) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User not found",
                });
            }

            return user;
        }),

    getRecommended: protectedProcedure
        .input(z.object({ limit: z.number().min(1).max(100).default(5) }))
        .query(async ({ ctx, input }) => {
            const userLanguages = await ctx.prisma.userLanguage.findMany({
                where: { userId: ctx.session.user.id },
            });

            const targetLanguages = userLanguages
                .filter((l) => l.rank !== "NATIVE")
                .map((l) => l.language);

            const nativeLanguages = userLanguages
                .filter((l) => l.rank === "NATIVE")
                .map((l) => l.language);

            return ctx.prisma.user.findMany({
                where: {
                    id: { not: ctx.session.user.id },
                    languages: {
                        some: {
                            OR: [
                                { language: { in: targetLanguages }, rank: "NATIVE" },
                                { language: { in: nativeLanguages }, rank: { not: "NATIVE" } },
                            ],
                        },
                    },
                },
                include: {
                    languages: true,
                },
                take: input.limit,
            });
        }),

    updateProfile: protectedProcedure
        .input(
            z.object({
                bio: z.string().min(1).max(500),
                hobbies: z.array(z.string()),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            return ctx.prisma.profile.upsert({
                where: { userId: ctx.session.user.id },
                create: {
                    ...input,
                    userId: ctx.session.user.id,
                },
                update: input,
            });
        }),

    updateLanguages: protectedProcedure
        .input(
            z.array(
                z.object({
                    language: z.string(),
                    rank: z.enum(["NATIVE", "FLUENT", "INTERMEDIATE", "BEGINNER"]),
                }),
            ),
        )
        .mutation(async ({ ctx, input }) => {
            // Delete existing languages
            await ctx.prisma.userLanguage.deleteMany({
                where: { userId: ctx.session.user.id },
            });

            // Create new languages
            return ctx.prisma.userLanguage.createMany({
                data: input.map((lang) => ({
                    ...lang,
                    userId: ctx.session.user.id,
                })),
            });
        }),
});
