import React from "react";
import Image from "next/image";

interface CommentAuthor {
    image: string;
    name: string;
}

interface Comment {
    id: string;
    content: string;
    createdBy: CommentAuthor;
    createdAt?: string;
}

const CommentItem = ({ comment }: { comment: Comment }) => (
    <div className="mb-6 rounded-lg bg-gray-50 p-4 last:mb-0">
        <div className="mb-3 flex items-center space-x-3">
            <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
                <Image
                    src={comment.createdBy.image}
                    alt={comment.createdBy.name}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex min-w-0 flex-col">
                <span className="truncate font-medium text-gray-900">
                    {comment.createdBy.name || "Deleted User"}
                </span>
                {comment.createdAt && (
                    <span className="text-sm text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                )}
            </div>
        </div>
        <div className="ml-11 break-words text-gray-700">
            <p className="whitespace-pre-wrap break-all">{comment.content}</p>
        </div>
    </div>
);

const CommentSection = ({ comments }: { comments: Comment[] }) => (
    <div className="w-full max-w-full overflow-hidden">
        <h3 className="mb-6 text-lg font-semibold text-gray-900">Comments ({comments.length})</h3>
        <div className="divide-y divide-gray-100">
            {comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
            ))}
        </div>
    </div>
);

export default CommentSection;
