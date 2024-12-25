"use client";

import { useParams, useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import PageWrapper from "~/app/_components/page-wrapper";
import { signIn, useSession } from "next-auth/react";
import { NewComment } from "~/app/_components/comment/new-comment";
import Image from "next/image";
import CommentSection from "~/app/_components/comment/comment";
import { Button } from "antd";

import { LogIn } from 'lucide-react';
// Types
interface Author {
    id?: string;
    image?: string | null;
    name?: string | null;
}

interface Post {
    id: string;
    title: string;
    content: string;
    createdBy?: Author;
}

// Loading Component
const LoadingState = () => (
    <PageWrapper>
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="flex items-center space-x-4">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"></div>
                    <span className="text-lg font-medium text-gray-700">Loading...</span>
                </div>
            </div>
        </div>
    </PageWrapper>
);

// Not Found Component
const NotFoundState = ({ onBack }: { onBack: () => void }) => (
    <PageWrapper>
        <div className="flex  items-center justify-center bg-gray-50">
            <div className="rounded-lg bg-white p-8 text-center shadow-sm">
                <h2 className="mb-4 text-2xl font-semibold text-gray-900">Post not found</h2>
                <button
                    onClick={onBack}
                    className="rounded-lg bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600"
                >
                    Go Back
                </button>
            </div>
        </div>
    </PageWrapper>
);

// Post Header Component
const PostHeader = ({ author }: { author?: Author }) => (
    <div className="mb-8 flex items-center space-x-4">
        {author?.image && (
            <div className="relative h-12 w-12 overflow-hidden rounded-full">
                <Image src={author.image} alt={author.name ?? ""} fill className="object-cover" />
            </div>
        )}
        <div>
            <p className="text-lg font-semibold text-gray-900">{author?.name}</p>
        </div>
    </div>
);

// Post Content Component
const PostContent = ({ title, content }: { title: string; content: string }) => (
    <div className="mb-8">
        <h1 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">{title}</h1>
        <div className="prose prose-lg max-w-none">
            <p className="whitespace-pre-wrap text-gray-700">{content}</p>
        </div>
    </div>
);

// Post Actions Component
const PostActions = ({
    isAuthor,
    onBack,
    onEdit,
    onDelete,
    isDeleting,
}: {
    isAuthor: boolean;
    onBack: () => void;
    onEdit: () => void;
    onDelete: () => void;
    isDeleting: boolean;
}) => (
    <div className="flex justify-end space-x-4">
        <button
            onClick={onBack}
            className="rounded-lg bg-gray-100 px-6 py-2 text-gray-700 transition-colors hover:bg-gray-200"
        >
            Back
        </button>

        {isAuthor && (
            <>
                <button
                    onClick={onEdit}
                    className="rounded-lg bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600"
                >
                    Edit
                </button>
                <button
                    onClick={onDelete}
                    disabled={isDeleting}
                    className="rounded-lg bg-red-500 px-6 py-2 text-white transition-colors hover:bg-red-600 disabled:opacity-50"
                >
                    {isDeleting ? "Deleting..." : "Delete"}
                </button>
            </>
        )}
    </div>
);

// Main Component
export default function ViewPost() {
    const router = useRouter();
    const session = useSession();
    const { slug } = useParams<{ slug: string }>();
    const { data: post, isLoading } = api.post.getBySlug.useQuery({ slug: slug });

    const deletePost = api.post.delete.useMutation({
        onSuccess: () => {
            router.push("/home");
            router.refresh();
        },
    });

    if (isLoading) return <LoadingState />;
    if (!post) return <NotFoundState onBack={() => router.back()} />;

    const isAuthor = session.data?.user.id === post?.createdBy?.id;

    return (
        <PageWrapper>
            <div className="  h-full overflow-y-auto bg-gray-50">
                <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                        <div className="p-6 sm:p-8">
                            <PostHeader
                                author={
                                    post?.createdBy ?? {
                                        id: "deleted",
                                        image: "/delete-user.webp",
                                        name: "Deleted User",
                                    }
                                }
                            />

                            <PostContent title={post.title} content={post.content} />

                            <PostActions
                                isAuthor={isAuthor}
                                onBack={() => router.back()}
                                onEdit={() => router.push(`/posts/edit/${post.id}`)}
                                onDelete={() => {
                                    if (
                                        window.confirm("Are you sure you want to delete this post?")
                                    ) {
                                        deletePost.mutate({ id: post.id });
                                    }
                                }}
                                isDeleting={deletePost.status === "pending"}
                            />

                            <div className="mt-8 border-t border-gray-200 pt-8">
                                {
                                    session.status == "authenticated" && <NewComment onAddComment={() => {}} postId={post.id} />
                                }
                                
                                {
                                    session.status == "unauthenticated" && <Button onClick={() =>signIn("google", {
                                        redirectTo: location.href
                                    })} icon={<LogIn/>}>
                                        Login To Comment
                                    </Button>
                                }
                            </div>

                            <CommentSection
                                // @ts-ignore
                                comments={
                                    post.Comment.map((e) => ({
                                        content: e.content ?? "",
                                        createdBy: {
                                            image: e?.createdBy?.image ?? "/delete-user.webp",
                                            name: e?.createdBy?.name ?? "deleted",
                                        },
                                        id: e.id ?? "deleted",
                                        createdAt: e.createdAt ?? "",
                                    })) ?? []
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
}
