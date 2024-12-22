import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const languageRouter = createTRPCRouter({
    // Get all languages used by users
    getAllLanguages: protectedProcedure.query(async ({ ctx }) => {
        const languages = await ctx.db.usersLanguage.groupBy({
            by: ["language"],
            _count: {
                language: true,
            },
            orderBy: {
                _count: {
                    language: "desc",
                },
            },
        });

        return languages.map((lang) => ({
            language: lang.language,
            count: lang._count.language,
        }));
    }),

    // Get users by language
    getUsersByLanguage: protectedProcedure
        .input(
            z.object({
                language: z.string(),
                rank: z.enum(["mother", "other"]).optional(),
                take: z.number().min(1).max(50).default(20),
                skip: z.number().default(0),
            }),
        )
        .query(async ({ ctx, input }) => {
            const users = await ctx.db.user.findMany({
                where: {
                    UsersLanguage: {
                        some: {
                            language: input.language,
                            ...(input.rank ? { rank: input.rank } : {}),
                        },
                    },
                    // Exclude current user
                    NOT: {
                        id: ctx.session.user.id,
                    },
                },
                include: {
                    Profile: true,
                    UsersLanguage: true,
                },
                take: input.take,
                skip: input.skip,
            });

            return users;
        }),

    // Get recommended language partners
    getRecommendedPartners: protectedProcedure
        .input(
            z.object({
                take: z.number().min(1).max(50).default(10),
                skip: z.number().default(0),
            }),
        )
        .query(async ({ ctx, input }) => {
            // Get current user's languages
            const userLanguages = await ctx.db.usersLanguage.findMany({
                where: { user_id: ctx.session.user.id },
            });

            // Find users who:
            // 1. Have native languages that the current user is learning
            // 2. Are learning languages that the current user speaks natively
            const recommendedUsers = await ctx.db.user.findMany({
                where: {
                    AND: [
                        {
                            UsersLanguage: {
                                some: {
                                    OR: userLanguages
                                        .filter((ul) => ul.rank === "other")
                                        .map((ul) => ({
                                            language: ul.language,
                                            rank: "mother",
                                        })),
                                },
                            },
                        },
                        {
                            UsersLanguage: {
                                some: {
                                    OR: userLanguages
                                        .filter((ul) => ul.rank === "mother")
                                        .map((ul) => ({
                                            language: ul.language,
                                            rank: "other",
                                        })),
                                },
                            },
                        },
                        {
                            // Exclude current user
                            NOT: {
                                id: ctx.session.user.id,
                            },
                        },
                    ],
                },
                include: {
                    Profile: true,
                    UsersLanguage: true,
                },
                take: input.take,
                skip: input.skip,
            });

            return recommendedUsers;
        }),
});
