import { createTRPCRouter, protectedProcedure } from "../trpc";

import { boardingSchema } from "~/schema/boardingSchema";
import { db } from "~/server/db";

export const onBoardingRouter = createTRPCRouter({
    board: protectedProcedure.input(boardingSchema).mutation(async (opts) => {
        const user_id = opts.ctx.session.user.id;
        console.log(user_id);

        const boarded = await db.user.findFirst({ where: { id: user_id } });
        if (boarded?.isBoarded) {
            throw Error("already did the onboarding");
        }
        db.$transaction([
            db.profile.create({
                data: {
                    bio: opts.input.bio,
                    hobbies: opts.input.hobbies,
                    userId: user_id,
                },
            }),

            db.userLanguage.create({
                data: {
                    userId: user_id,
                    language: opts.input.mother,
                    rank: "MOTHER",
                },
            }),
            ...(opts.input.other ?? []).map((e) =>
                db.userLanguage.create({
                    data: {
                        userId: user_id,
                        language: e ?? "",
                        rank: "OTHER",
                    },
                }),
            ),
            db.user.update({
                where: { id: user_id },
                data: { isBoarded: true, country: opts.input.country },
            }),
        ]);

        return true;
    }),
});
