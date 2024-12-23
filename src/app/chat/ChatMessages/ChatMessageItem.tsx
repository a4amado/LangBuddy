"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { RootState } from "../ChatState/store";
import { useSelector } from "react-redux";
import { Avatar } from "antd";

interface ChatMessageItemProps {
    idx: number;
}

export const ChatMessageItem: React.FC<ChatMessageItemProps> = ({ idx }) => {
    const { data: session } = useSession();

    // Select active chat index first
    const activeChat = useSelector<RootState>(
        (state: RootState) => state.active,
    ) as RootState["active"];

    // Then select the message using the active chat and index
    const message = useSelector<RootState>((state: RootState) => {
        if (state.state == "loading" || !state.messages[activeChat || ""]) return null;
        return state.messages[activeChat || ""];
    }) as RootState["messages"][0];

    // If no message, return null
    if (!message) {
        return null;
    }

    const isCurrentUser = message[idx]?.senderId === session?.user.id;

    return (
        <div className="flex w-full px-4 mb-2">
            <div
                className={`flex w-full  align-middle ${isCurrentUser ? "justify-end" : "justify-start"}`}
            >
                {!isCurrentUser && (
                    <Avatar
                        alt={message[idx]?.sender?.name ?? ""}
                        src={`${message[idx]?.sender?.image}`}
                        className="w-6 m-3  h-6 aspect-square object-contain"
                    />
                )}
                <p
                    className={`
            relative
            max-w-[90%]
            sm:max-w-[80%]
            md:max-w-[70%]
            p-3
            rounded-lg
            break-words
            ${isCurrentUser ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}
            shadow-sm
          `}
                >
                    <span>{message[idx]?.content}</span>
                </p>
            </div>
        </div>
    );
};

export default ChatMessageItem;
