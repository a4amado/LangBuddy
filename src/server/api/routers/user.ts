import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
    // Get current user's profile
    me: protectedProcedure.query(async ({ ctx }) => {
        const user = await ctx.db.user.findUnique({
            where: { id: ctx.session.user.id },
            include: {
                Profile: true,
                UsersLanguage: true,
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

    // Update user profile
    updateProfile: protectedProcedure
        .input(
            z.object({
                name: z.string().optional(),
                bio: z.string().optional(),
                hobbies: z.string().optional(),
                country: z.string().optional(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            // Update user
            const user = await ctx.db.user.update({
                where: { id: ctx.session.user.id },
                data: {
                    name: input.name,
                    country: input.country,
                    Profile:
                        input.bio || input.hobbies
                            ? {
                                  upsert: {
                                      create: {
                                          bio: input.bio ?? "",
                                          hobbies: input.hobbies ?? "",
                                      },
                                      update: {
                                          bio: input.bio,
                                          hobbies: input.hobbies,
                                      },
                                  },
                              }
                            : undefined,
                },
                include: {
                    Profile: true,
                },
            });

            return user;
        }),

    // Update user languages
    updateLanguages: protectedProcedure
        .input(
            z.array(
                z.object({
                    language: z.string(),
                    rank: z.enum(["mother", "other"]),
                }),
            ),
        )
        .mutation(async ({ ctx, input }) => {
            // Delete existing languages
            await ctx.db.usersLanguage.deleteMany({
                where: { user_id: ctx.session.user.id },
            });

            // Create new languages
            const languages = await ctx.db.usersLanguage.createMany({
                data: input.map((lang) => ({
                    language: lang.language,
                    rank: lang.rank,
                    user_id: ctx.session.user.id,
                })),
            });

            return languages;
        }),

    // Get user by ID with profile
    getById: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
        const user = await ctx.db.user.findUnique({
            where: { id: input },
            include: {
                Profile: true,
                UsersLanguage: true,
                posts: {
                    orderBy: { createdAt: "desc" },
                    take: 10,
                    include: {
                        createdBy: {
                            select: {
                                image: true,
                                name: true,
                                id: true,
                            },
                        },
                    },
                },
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

    // Search users
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
                    UsersLanguage: {
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
                    Profile: true,
                    UsersLanguage: true,
                },
                take: input.take,
                skip: input.skip,
            });

            return users;
        }),

    // Block a user
    blockUser: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
        const blocked = await ctx.db.blocked.create({
            data: {
                user_1_id: ctx.session.user.id,
                user_2_id: input,
            },
        });

        return blocked;
    }),

    // Unblock a user
    unblockUser: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
        await ctx.db.blocked.delete({
            where: {
                user_1_id_user_2_id: {
                    user_1_id: ctx.session.user.id,
                    user_2_id: input,
                },
            },
        });

        return true;
    }),

    // Get blocked users
    getBlockedUsers: protectedProcedure.query(async ({ ctx }) => {
        const blocked = await ctx.db.blocked.findMany({
            where: {
                user_1_id: ctx.session.user.id,
            },
        });

        return blocked;
    }),
});
