"use client";

import React from "react";
import { LoaderPinwheel } from "lucide-react";
import { api } from "~/trpc/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, switchChat, toggleSideBar } from "../ChatState/store";
import { useSession } from "next-auth/react";
import Image from "next/image";

export const ChatSidebarBody: React.FC = () => {
    const chats = useSelector<RootState>((state) => state.chats) as RootState["chats"];
    const state = useSelector<RootState>((state) => state.state) as RootState["state"];

    if (state == "loading") {
        return (
            <div className="w-full h-full flex justify-center align-middle">
                <LoaderPinwheel size={48} className="animate-spin" strokeWidth={1.5} />
            </div>
        );
    }

    return (
        <>
            {chats.map((chat, idx) => (
                <>
                    <ChatSidebarBodyItem key={chat.id} id={chat.id} idx={idx} />
                </>
            ))}
        </>
    );
};

interface ChatSidebarBodyItemProps {
    id: string;
    idx: number;
}

const ChatSidebarBodyItem: React.FC<ChatSidebarBodyItemProps> = React.memo(({ id, idx }) => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSession();
    const chats = useSelector<RootState>((state) => state.chats) as RootState["chats"];
    const active = useSelector<RootState>((state) => state.active) as RootState["active"];
    const activeChat = active == id;
    const otherUser = chats[idx]?.members.find((member) => member.id != user.data?.user.id) ?? {
        id: "delete",
        image: "/delete-user.webp",
        name: "Deleted User",
    };

    return (
        <div
            className={`p-3 m-2 rounded  cursor-pointer ${
                activeChat ? "bg-blue-100" : "hover:bg-gray-200"
            }`}
            role="button"
            onClick={() => {
                dispatch(switchChat({ id }));
                dispatch(toggleSideBar());
            }}
        >
            <div className="flex gap-2">
                <Image
                    className="rounded-lg"
                    src={otherUser?.image || ""}
                    width={25}
                    height={25}
                    alt={"user img"}
                />
                <h3 className="font-semibold">{otherUser.name}</h3>
            </div>
            <p className="text-sm ml-2 text-gray-600 truncate">
                {chats[idx]?.lastMessage?.content ?? "No messages yet"}
            </p>
        </div>
    );
});

ChatSidebarBodyItem.displayName = "ChatSidebarBodyItem";
