import { Button, Input, Modal } from "antd";
import { useState } from "react";
import { SendIcon } from "lucide-react";
import { api } from "~/trpc/react";

export const NewComment = ({ postId }: { postId: string; onAddComment: () => void }) => {
    const [comment, setComment] = useState("");
    const createComment = api.comment.create.useMutation({
        onSuccess: () => {
            setComment("");
            window.location.reload();
        },
    });
    return (
        <div className="">
            {createComment.status}
            <div className="rounded-xl">
                <Input.TextArea
                    className=" text-xl"
                    placeholder="write a comment......."
                    autoSize={{ minRows: 1 }}
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                ></Input.TextArea>
            </div>
            <div className="flex justify-end ">
                <Button
                    loading={createComment.status == "pending"}
                    onClick={() => {
                        createComment.mutate({ content: comment, post_id: postId });
                    }}
                    variant="filled"
                    className="h-full my-2"
                    icon={<SendIcon />}
                >
                    submit
                </Button>
            </div>
        </div>
    );
};
