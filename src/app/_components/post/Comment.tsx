"use client";

import React, { useState } from "react";
import { ArrowBigUp, ArrowBigDown, MessageSquare, MoreHorizontal, Reply } from "lucide-react";
import { Avatar, Button, Dropdown, Tooltip } from "antd";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface CommentProps {
    id: string;
    content: string;
    author: {
        id: string;
        name: string;
        image: string;
    };
    createdAt: Date;
    upvotes: number;
    downvotes: number;
    replyCount: number;
    userVote?: "up" | "down" | null;
    depth?: number;
    onVote: (commentId: string, voteType: "up" | "down") => void;
    onReply: (commentId: string) => void;
    onEdit?: (commentId: string, content: string) => void;
    onDelete?: (commentId: string) => void;
    isAuthor?: boolean;
}

export default function Comment({
    id,
    content,
    author,
    createdAt,
    upvotes,
    downvotes,
    replyCount,
    userVote,
    depth = 0,
    onVote,
    onReply,
    onEdit,
    onDelete,
    isAuthor = false,
}: CommentProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(content);
    const voteScore = upvotes - downvotes;

    const moreMenuItems = [
        ...(isAuthor
            ? [
                  {
                      key: "edit",
                      label: "Edit Comment",
                      onClick: () => setIsEditing(true),
                  },
                  {
                      key: "delete",
                      label: "Delete Comment",
                      onClick: () => onDelete?.(id),
                  },
              ]
            : []),
        {
            key: "report",
            label: "Report Comment",
        },
    ];

    const handleVote = (type: "up" | "down") => {
        if (userVote === type) {
            onVote(id, type); // Remove vote
        } else {
            onVote(id, type); // Add or change vote
        }
    };

    const handleSaveEdit = () => {
        onEdit?.(id, editContent);
        setIsEditing(false);
    };

    return (
        <div
            className={`bg-white rounded-lg p-4 mb-2 ${
                depth > 0 ? "ml-8 border-l-2 border-gray-100" : ""
            }`}
        >
            {/* Comment Header */}
            <div className="flex items-start justify-between mb-2">
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
                <Dropdown menu={{ items: moreMenuItems }} trigger={["click"]}>
                    <Button
                        type="text"
                        icon={<MoreHorizontal size={20} />}
                        className="text-gray-500"
                    />
                </Dropdown>
            </div>

            {/* Comment Content */}
            {isEditing ? (
                <div className="mb-2">
                    <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                    />
                    <div className="flex justify-end space-x-2 mt-2">
                        <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                        <Button type="primary" onClick={handleSaveEdit}>
                            Save
                        </Button>
                    </div>
                </div>
            ) : (
                <p className="text-gray-700 mb-2">{content}</p>
            )}

            {/* Comment Actions */}
            <div className="flex items-center space-x-4">
                {/* Voting */}
                <div className="flex items-center space-x-1">
                    <Tooltip title="Upvote">
                        <button
                            onClick={() => handleVote("up")}
                            className={`p-1 rounded hover:bg-gray-100 ${
                                userVote === "up" ? "text-blue-600" : "text-gray-500"
                            }`}
                        >
                            <ArrowBigUp size={20} />
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
                            <ArrowBigDown size={20} />
                        </button>
                    </Tooltip>
                </div>

                {/* Reply */}
                <button
                    onClick={() => onReply(id)}
                    className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
                >
                    <Reply size={18} />
                    <span>Reply</span>
                    {replyCount > 0 && <span className="text-gray-500">({replyCount})</span>}
                </button>
            </div>
        </div>
    );
}
