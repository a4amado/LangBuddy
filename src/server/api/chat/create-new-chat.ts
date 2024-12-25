import { z } from "zod";

import { db } from "~/server/db";
import { protectedProcedure } from "../trpc";
import { ChatType, LanguageRank } from "@prisma/client";

// Since zod is not available, we'll use TypeScript types instead

export const createChat = protectedProcedure
    .input(
        z.object({
            userId: z.string().cuid(),
            type: z.enum([ChatType.DIRECT, ChatType.GROUP]).default("DIRECT"),
        }),
    )
    .mutation(async ({ ctx, input }) => {
        if (input.type === "DIRECT") {
            const existingChat = await db.chat.findFirst({
                where: {
                    type: "DIRECT",
                    members: {
                        every: {
                            userId: {
                                in: [ctx.session.user.id, input.userId],
                            },
                        },
                    },
                },
                include: {
                    members: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    name: true,
                                    image: true,
                                },
                            },
                        },
                    },
                },
            });

            if (existingChat) return existingChat;
        }

        return db.chat.create({
            data: {
                type: input.type,

                members: {
                    createMany: {
                        data:
                            input.type === "DIRECT"
                                ? [{ userId: ctx.session.user.id }, { userId: input.userId }]
                                : [{ userId: ctx.session.user.id }],
                    },
                },
            },
            include: {
                members: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                image: true,
                            },
                        },
                    },
                },
            },
        });
    });
