"use client";

import Image from "next/image";
import Link from "next/link";
import { type Post, type User } from "@prisma/client";
import { formatRelativeTime } from "~/lib/utils";
import { api } from "~/trpc/react";

interface PostWithAuthor extends Post {
    author: User | null;
}

interface PostCardProps {
    post: PostWithAuthor;
}

export function PostCard({ post }: PostCardProps) {
    const utils = api.useUtils();

    return (
        <div className="rounded-lg border bg-card p-4">
            <div className="flex items-start gap-4">
                {post.author?.image && (
                    <Link href={`/profile/${post.author.id}`}>
                        <Image
                            src={post.author.image}
                            alt={post.author.name ?? "User"}
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                    </Link>
                )}

                <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                        <Link
                            href={`/profile/${post.author?.id}`}
                            className="font-semibold hover:underline"
                        >
                            {post.author?.name}
                        </Link>
                        <span className="text-sm text-muted-foreground">
                            {formatRelativeTime(post.createdAt)}
                        </span>
                    </div>

                    <h3 className="font-semibold">{post.title}</h3>
                    <p className="text-muted-foreground">{post.content}</p>
                </div>
            </div>
        </div>
    );
}
