import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { db } from "~/server/db";

export const userRouter = createTRPCRouter({
    getById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
        const user = await db.user.findUnique({
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
            const userLanguages = await db.userLanguage.findMany({
                where: { userId: ctx.session.user.id },
            });

            const targetLanguages = userLanguages
                .filter((l) => l.rank !== "MOTHER")
                .map((l) => l.language);

            const nativeLanguages = userLanguages
                .filter((l) => l.rank === "MOTHER")
                .map((l) => l.language);

            return db.user.findMany({
                where: {
                    id: { not: ctx.session.user.id },
                    languages: {
                        some: {
                            OR: [
                                { language: { in: targetLanguages }, rank: "MOTHER" },
                                { language: { in: nativeLanguages }, rank: { not: "MOTHER" } },
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
                hobbies: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            return db.profile.upsert({
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
                    rank: z.enum(["MOTHER", "OTHER"]),
                }),
            ),
        )
        .mutation(async ({ ctx, input }) => {
            // Delete existing languages
            await db.userLanguage.deleteMany({
                where: { userId: ctx.session.user.id },
            });

            // Create new languages
            return db.userLanguage.createMany({
                data: input.map((lang) => ({
                    ...lang,
                    userId: ctx.session.user.id,
                })),
            });
        }),
    search: protectedProcedure
        .input(
            z.object({
                query: z.string().optional(),
                languages: z.string().optional(),
                take: z.number().min(1).max(50).default(10),
                skip: z.number().default(0),
            }),
        )
        .query(async ({ ctx, input }) => {
            const users = await ctx.db.user.findMany({
                where: {
                    OR: [
                        { name: { contains: input.query, mode: "insensitive" } },
                        { email: { contains: input.query, mode: "insensitive" } },
                    ],
                    languages: {
                        some: {
                            language: input.languages,
                        },
                    },
                    // Exclude current user
                    NOT: {
                        id: ctx.session.user.id,
                    },
                },
                include: {
                    profile: {
                        select: {
                            bio: true,
                            hobbies: true,
                        },
                    },
                    languages: { select: { language: true, rank: true } },
                },
                take: input.take,
                skip: input.skip,
            });
            if (!users) {
                const users = await ctx.db.user.findMany({
                    
                    include: {
                        profile: {
                            select: {
                                bio: true,
                                hobbies: true,
                            },
                        },
                        languages: { select: { language: true, rank: true } },
                    },
                    take: input.take,
                    skip: input.skip,
                    orderBy: {
                        lastSeen: "desc"
                    }
                }); 
                return users
            }

            return users;
        }),
});
