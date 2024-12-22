import { z } from "zod";
import { db } from "~/server/db";

export const schema$editPost = z.object({
    content: z.string().min(50),
    title: z.string().min(15),
    postId: z.string().cuid(),
});
type editPostProps = {
    content: string;
    title: string;
    userID: string;
    postId: string;
};
export const editPost = async (opts: editPostProps) => {
    const editpost = await db.post.update({
        data: {
            title: opts.title,
            content: opts.content,
        },
        where: {
            createdById: opts.userID,
            id: opts.postId,
        },
    });
    return { post_id: editpost.id };
};
