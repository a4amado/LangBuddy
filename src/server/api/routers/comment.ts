import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

import { boardingSchema } from "~/schema/boardingSchema";
import { db } from "~/server/db";
import { createComment } from "../comment/create-comment";

export const commentRouter = createTRPCRouter({
    create: createComment,
});
