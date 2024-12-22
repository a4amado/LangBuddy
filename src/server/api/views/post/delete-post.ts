import { z } from "zod";
import { db } from "~/server/db";

export const schema$deletePost = z.object({
    postId: z.string().cuid(),
});
type deletePostProps = {
    userID: string;
    postId: string;
};
export const deletePost = async (opts: deletePostProps) => {
    const deletepost = await db.post.delete({
        where: {
            createdById: opts.userID,
            id: opts.postId,
        },
    });
    return { post_id: deletepost.id };
};
