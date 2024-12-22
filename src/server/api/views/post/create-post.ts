import { z } from "zod";
import { db } from "~/server/db";

export const schema$createPost = z.object({
    content: z.string().min(50),
    title: z.string().min(15),
});
type createPostProps = {
    content: string;
    title: string;
    userID: string;
};
export const createPost = async (opts: createPostProps) => {
    const new_post = await db.post.create({
        data: {
            title: opts.title,
            content: opts.content,
            createdById: opts.userID,
        },
    });
    return { post_id: new_post.id };
};
