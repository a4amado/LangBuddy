"use client";

import React, { useState } from "react";
import {
    ArrowBigUp,
    ArrowBigDown,
    MessageSquare,
    Share2,
    Bookmark,
    MoreHorizontal,
} from "lucide-react";
import { Avatar, Button, Dropdown, Menu, Tooltip } from "antd";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface PostProps {
    id: string;
    title: string;
    content: string;
    author: {
        id: string;
        name: string;
        image: string;
    };
    createdAt: Date;
    upvotes: number;
    downvotes: number;
    commentCount: number;
    userVote?: "up" | "down" | null;
    isBookmarked?: boolean;
    onVote: (postId: string, voteType: "up" | "down") => void;
    onBookmark: (postId: string) => void;
    onShare: (postId: string) => void;
    onComment: (postId: string) => void;
}

export default function Post({
    id,
    title,
    content,
    author,
    createdAt,
    upvotes,
    downvotes,
    commentCount,
    userVote,
    isBookmarked = false,
    onVote,
    onBookmark,
    onShare,
    onComment,
}: PostProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const voteScore = upvotes - downvotes;

    const moreMenuItems = [
        {
            key: "report",
            label: "Report Post",
        },
        {
            key: "hide",
            label: "Hide Post",
        },
    ];

    const handleVote = (type: "up" | "down") => {
        if (userVote === type) {
            onVote(id, type); // Remove vote
        } else {
            onVote(id, type); // Add or change vote
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
            {/* Post Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                    <Link href={`/profile/${author.id}`}>
                        <Avatar src={author.image} alt={author.name} className="cursor-pointer" />
                    </Link>
                    <div className="ml-3">
                        <Link
                            href={`/profile/${author.id}`}
                            className="font-medium text-gray-900 hover:underline"
                        >
                            {author.name}
                        </Link>
                        <p className="text-sm text-gray-500">
                            {formatDistanceToNow(createdAt, { addSuffix: true })}
                        </p>
                    </div>
                </div>
                <Dropdown
                    menu={{
                        items: moreMenuItems,
                    }}
                    trigger={["click"]}
                >
                    <Button
                        type="text"
                        icon={<MoreHorizontal size={20} />}
                        className="text-gray-500"
                    />
                </Dropdown>
            </div>

            {/* Post Content */}
            <Link href={`/post/${id}`} className="block mb-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
                <div className={`text-gray-700 ${!isExpanded && "line-clamp-3"}`}>
                    {content}
                </div>
                {content.length > 150 && !isExpanded && (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setIsExpanded(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 text-sm mt-1"
                    >
                        Read more
                    </button>
                )}
            </Link>

            {/* Post Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                {/* Voting */}
                <div className="flex items-center space-x-2">
                    <Tooltip title="Upvote">
                        <button
                            onClick={() => handleVote("up")}
                            className={`p-1 rounded hover:bg-gray-100 ${
                                userVote === "up" ? "text-blue-600" : "text-gray-500"
                            }`}
                        >
                            <ArrowBigUp size={24} />
                        </button>
                    </Tooltip>
                    <span className="font-medium text-gray-700">{voteScore}</span>
                    <Tooltip title="Downvote">
                        <button
                            onClick={() => handleVote("down")}
                            className={`p-1 rounded hover:bg-gray-100 ${
                                userVote === "down" ? "text-red-600" : "text-gray-500"
                            }`}
                        >
                            <ArrowBigDown size={24} />
                        </button>
                    </Tooltip>
                </div>

                {/* Comments */}
                <button
                    onClick={() => onComment(id)}
                    className="flex items-center space-x-2 text-gray-500 hover:text-gray-700"
                >
                    <MessageSquare size={20} />
                    <span>{commentCount} Comments</span>
                </button>

                {/* Share */}
                <button
                    onClick={() => onShare(id)}
                    className="flex items-center space-x-2 text-gray-500 hover:text-gray-700"
                >
                    <Share2 size={20} />
                    <span>Share</span>
                </button>

                {/* Bookmark */}
                <button
                    onClick={() => onBookmark(id)}
                    className={`flex items-center space-x-2 ${
                        isBookmarked ? "text-yellow-600" : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                    <Bookmark size={20} />
                    <span>Save</span>
                </button>
            </div>
        </div>
    );
} 