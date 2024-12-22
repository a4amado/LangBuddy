
import { createTRPCRouter, protectedProcedure } from "../trpc";

import { boardingSchema } from "~/schema/boardingSchema";
import { db } from "~/server/db";

export const onBoardingRouter = createTRPCRouter({
    board: protectedProcedure.input(boardingSchema).mutation(async (opts) => {
        const user_id = opts.ctx.session.user.id;
        console.log(user_id);

        const boarded = await db.user.findFirst({ where: { id: user_id } });
        if (boarded?.boarded) {
            throw Error("already does the onboarding");
        }
        db.$transaction([
            db.profile.create({
                data: {
                    bio: opts.input.bio,
                    hobbies: opts.input.hobbies,
                    user_id: user_id,
                },
            }),

            db.usersLanguage.create({
                data: {
                    user_id: user_id,
                    language: opts.input.mother,
                    rank: "mother",
                },
            }),
            ...(opts.input.other ?? []).map((e) =>
                db.usersLanguage.create({
                    data: {
                        user_id: user_id,
                        language: e ?? "",
                        rank: "other",
                    },
                }),
            ),
            db.user.update({
                where: { id: user_id },
                data: { boarded: true, country: opts.input.country },
            }),
        ]);

        return true;
    }),
});
