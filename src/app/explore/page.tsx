"use client";

import { api } from "~/trpc/react";
import PageWrapper from "../_components/page-wrapper";
import Post from "../_components/post/Post";
import CreatePost from "../_components/post/create-post";
const mockPosts = [
    {
        id: "post-1",
        title: "Getting Started with React and TypeScript",
        content:
            "TypeScript is a powerful addition to React development. It provides type safety and better developer experience. In this post, we'll explore how to set up a new React project with TypeScript and learn about some best practices for state management, component architecture, and handling props. We'll also dive into some advanced TypeScript features that can make your React code more robust and maintainable.",
        author: {
            id: "user-1",
            name: "Sarah Chen",
            image: "/api/placeholder/40/40",
        },
        createdAt: new Date("2024-12-21T10:30:00"),
        upvotes: 125,
        downvotes: 12,
        commentCount: 48,
        userVote: "up" as const,
        isBookmarked: true,
    },
    {
        id: "post-1",
        title: "Getting Started with React and TypeScript",
        content:
            "TypeScript is a powerful addition to React development. It provides type safety and better developer experience. In this post, we'll explore how to set up a new React project with TypeScript and learn about some best practices for state management, component architecture, and handling props. We'll also dive into some advanced TypeScript features that can make your React code more robust and maintainable.",
        author: {
            id: "user-1",
            name: "Sarah Chen",
            image: "/api/placeholder/40/40",
        },
        createdAt: new Date("2024-12-21T10:30:00"),
        upvotes: 125,
        downvotes: 12,
        commentCount: 48,
        userVote: "up" as const,
        isBookmarked: true,
    },
    {
        id: "post-1",
        title: "Getting Started with React and TypeScript",
        content:
            "TypeScript is a powerful addition to React development. It provides type safety and better developer experience. In this post, we'll explore how to set up a new React project with TypeScript and learn about some best practices for state management, component architecture, and handling props. We'll also dive into some advanced TypeScript features that can make your React code more robust and maintainable.",
        author: {
            id: "user-1",
            name: "Sarah Chen",
            image: "/api/placeholder/40/40",
        },
        createdAt: new Date("2024-12-21T10:30:00"),
        upvotes: 125,
        downvotes: 12,
        commentCount: 48,
        userVote: "up" as const,
        isBookmarked: true,
    },
    {
        id: "post-1",
        title: "Getting Started with React and TypeScript",
        content:
            "TypeScript is a powerful addition to React development. It provides type safety and better developer experience. In this post, we'll explore how to set up a new React project with TypeScript and learn about some best practices for state management, component architecture, and handling props. We'll also dive into some advanced TypeScript features that can make your React code more robust and maintainable.",
        author: {
            id: "user-1",
            name: "Sarah Chen",
            image: "/api/placeholder/40/40",
        },
        createdAt: new Date("2024-12-21T10:30:00"),
        upvotes: 125,
        downvotes: 12,
        commentCount: 48,
        userVote: "up" as const,
        isBookmarked: true,
    },
    {
        id: "post-1",
        title: "Getting Started with React and TypeScript",
        content:
            "TypeScript is a powerful addition to React development. It provides type safety and better developer experience. In this post, we'll explore how to set up a new React project with TypeScript and learn about some best practices for state management, component architecture, and handling props. We'll also dive into some advanced TypeScript features that can make your React code more robust and maintainable.",
        author: {
            id: "user-1",
            name: "Sarah Chen",
            image: "/api/placeholder/40/40",
        },
        createdAt: new Date("2024-12-21T10:30:00"),
        upvotes: 125,
        downvotes: 12,
        commentCount: 48,
        userVote: "up" as const,
        isBookmarked: true,
    },
    {
        id: "post-2",
        title: "Best Practices for Modern Web Development",
        content:
            "Modern web development has evolved significantly over the past few years. From performance optimization to accessibility considerations, there are many factors to consider when building web applications today. This post covers essential practices that every developer should know.",
        author: {
            id: "user-2",
            name: "Marcus Johnson",
            image: "/api/placeholder/40/40",
        },
        createdAt: new Date("2024-12-22T08:15:00"),
        upvotes: 89,
        downvotes: 5,
        commentCount: 32,
        userVote: null,
        isBookmarked: false,
    },
    {
        id: "post-3",
        title: "Understanding State Management in 2024",
        content:
            "With the rise of various state management solutions, it's important to understand when to use what. From React's built-in useState and useContext to external libraries like Redux and Zustand, this guide will help you make informed decisions for your projects.",
        author: {
            id: "user-3",
            name: "Emily Rodriguez",
            image: "/api/placeholder/40/40",
        },
        createdAt: new Date("2024-12-22T15:45:00"),
        upvotes: 256,
        downvotes: 18,
        commentCount: 95,
        userVote: "down" as const,
        isBookmarked: false,
    },
];

const mockHandlers = {
    onVote: (postId: string, voteType: "up" | "down") => {
        console.log(`Vote ${voteType} on post ${postId}`);
    },
    onBookmark: (postId: string) => {
        console.log(`Toggle bookmark on post ${postId}`);
    },
    onShare: (postId: string) => {
        console.log(`Share post ${postId}`);
    },
    onComment: (postId: string) => {
        console.log(`Open comments for post ${postId}`);
    },
};
export default function PostPage() {
    const post = api.post.getInfinitePosts.useQuery({ cursor: undefined, limit: 15 });

    return (
        <PageWrapper>
            <div className="w-full  overflow-y-scroll h-full">
                <div className="max-w-4xl  mx-auto h-full py-4">
                    <CreatePost />
                    {post?.data?.items?.map((post) => (
                        <Post
                            key={post.id}
                            slug={post.slug}
                            author={{
                                id: post.createdBy?.id || "deleted",
                                image: post.createdBy?.image || "deleted",
                                name: post?.createdBy?.name || "delete",
                            }}
                            commentCount={0}
                            createdAt={post.createdAt}
                            content={post.content}
                            title={post.title}
                            id={post.id}
                            downvotes={0}
                            upvotes={0}
                            onBookmark={console.log}
                            onComment={console.log}
                            onShare={console.log}
                            onVote={console.log}
                            isBookmarked={true}
                            userVote={"down"}
                        />
                    ))}
                </div>
            </div>
        </PageWrapper>
    );
}
