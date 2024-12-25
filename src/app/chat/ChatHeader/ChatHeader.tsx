"use client";

import { useSelector } from "react-redux";
import { RootState } from "../ChatState/store";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface ChatHeaderProps {
    onSettingsClick?: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onSettingsClick }) => {
    const active = useSelector<RootState>((state) => state.active) as RootState["active"];
    const chats = useSelector<RootState>((state) => state.chats) as RootState["chats"];
    const curruntChat = chats.find((chat) => chat.id == active);
    const session = useSession();
    const otherUser = curruntChat?.members.find((member) => member.id != session.data?.user.id) ?? {
        id: "delete",
        image: "/delete-user.webp",
        name: "Deleted User",
    };

    return (
        <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
            <div className="flex gap-2 w-full">
                <Image
                    className="rounded-lg"
                    src={otherUser?.image || ""}
                    width={25}
                    height={25}
                    alt={"user img"}
                />
                <h3 className="text-lg font-semibold" data-user-id={otherUser?.id}>
                    {otherUser?.name}
                </h3>
            </div>
            <button
                className="text-gray-500 hover:text-gray-700"
                aria-label="Chat settings"
                onClick={onSettingsClick}
            >
                ⚙️
            </button>
        </div>
    );
};
