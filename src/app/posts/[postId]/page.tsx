"use client";

import { useParams, useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import PageWrapper from "~/app/_components/page-wrapper";
import { Button } from "antd";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function ViewPost() {
    const router = useRouter();
    const session = useSession();
    const { postId } = useParams<{ postId: string }>();
    const { data: post, isLoading } = api.post.view.useQuery({ postId: postId });

    const deletePost = api.post.delete.useMutation({
        onSuccess: () => {
            router.push("/home");
            router.refresh();
        },
    });

    if (isLoading) {
        return (
            <PageWrapper>
                <div className="flex h-full items-center justify-center">
                    <div>Loading...</div>
                </div>
            </PageWrapper>
        );
    }

    if (!post) {
        return (
            <PageWrapper>
                <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-xl font-semibold text-gray-900">Post not found</h2>
                        <Button onClick={() => router.back()} className="mt-4">
                            Go Back
                        </Button>
                    </div>
                </div>
            </PageWrapper>
        );
    }

    const isAuthor = session.data?.user.id === post?.createdBy?.id;

    return (
        <PageWrapper>
            <div className="h-full overflow-y-auto bg-white p-6">
                <div className="max-w-2xl mx-auto">
                    {/* Author Info */}
                    <div className="flex items-center mb-6">
                        {post?.createdBy?.image && (
                            <Image
                                src={post?.createdBy?.image}
                                alt={post?.createdBy?.name ?? ""}
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                        )}
                        <div className="ml-3">
                            <p className="font-semibold text-gray-900">{post?.createdBy?.name}</p>
                        </div>
                    </div>

                    {/* Post Content */}
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
                    <div className="prose max-w-none">
                        <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex justify-end space-x-4">
                        <Button onClick={() => router.back()} size="large" className="rounded-lg">
                            Back
                        </Button>

                        {isAuthor && (
                            <>
                                <Button
                                    onClick={() => router.push(`/posts/edit/${post.id}`)}
                                    size="large"
                                    className="rounded-lg"
                                >
                                    Edit
                                </Button>
                                <Button
                                    danger
                                    onClick={() => {
                                        if (
                                            window.confirm(
                                                "Are you sure you want to delete this post?",
                                            )
                                        ) {
                                            deletePost.mutate({ postId: post.id });
                                        }
                                    }}
                                    loading={deletePost.status === "pending"}
                                    size="large"
                                    className="rounded-lg"
                                >
                                    Delete
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
}
