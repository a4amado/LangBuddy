"use client";

import React from "react";
import { LoaderPinwheel } from "lucide-react";
import { api } from "~/trpc/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, switchChat } from "../ChatState/store";
import { useSession } from "next-auth/react";

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
    const otherUSer =
        chats[idx]?.members[0]?.id != user.data?.user.id
            ? chats[idx]?.members[0]?.name
            : chats[idx]?.members[1]?.name;
    return (
        <div
            className={`p-3 mb-2 rounded cursor-pointer ${
                activeChat ? "bg-blue-100" : "hover:bg-gray-200"
            }`}
            role="button"
            onClick={() => {
                console.log("id", id);

                dispatch(switchChat({ id }));
            }}
        >
            <h3 className="font-semibold">{otherUSer}</h3>
            <p className="text-sm text-gray-600 truncate">
                {chats[idx]?.lastMessage?.content ?? "No messages yet"}
            </p>
        </div>
    );
});

ChatSidebarBodyItem.displayName = "ChatSidebarBodyItem";
