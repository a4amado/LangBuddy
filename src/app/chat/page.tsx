"use client";

import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import { ChatHeader } from "./ChatHeader/ChatHeader";
import { ChatInput } from "./ChatInput/ChatInput";

import { ChatMessagesList } from "./ChatMessages/ChatMessagesList";
import { api } from "~/trpc/react";

import { useDispatch, useSelector } from "react-redux";
import {
    addNewMessage,
    AppDispatch,
    fetchNonExistingChat,
    init,
    RootState,
} from "./ChatState/store";
import { useSession } from "next-auth/react";
import { LoadingSpinner } from "~/components/ui/loading";

// Initialize Pusher
Pusher.logToConsole = true;

export default function ChatPage() {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSession();
    const active = useSelector<RootState>((state) => state.active) as RootState["active"];
    const messeges = useSelector<RootState>((state) => state.messages) as RootState["messages"];
    const chats = api.chat.getAll.useQuery();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        // Initialize Pusher
        const pusher = new Pusher("e52b6be16531b104cc75", {
            cluster: "eu",
        });

        // Subscribe to channel
        const channel = pusher.subscribe(user.data?.user.id || "");

        // Bind to event
        channel.bind("new_msg", async function (data: any) {
            if (messeges[data.chatId]) {
                console.log("new msg");

                dispatch(addNewMessage(data as any));
            } else {
                console.log("fetch new chat");

                // @ts-ignore
                dispatch(fetchNonExistingChat({ payload: { chat_id: data.chatId } }));
            }
        });

        // Initialize chats
        if (chats.data) {
            dispatch(init(chats.data));
        }

        // Cleanup
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
            pusher.disconnect();
        };
    }, [chats.status]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const loading = useSelector<RootState>((state) => state.state) as RootState["state"];

    return (
        <>
            <main className="flex-1 flex h-full w-full overflow-hidden">
                {loading == "loading" && <LoadingSpinner />}
                {loading == "idel" && (
                    <div className="flex flex-col flex-1 w-full overflow-hidden">
                        {active && (
                            <>
                                <ChatHeader
                                    onSettingsClick={() => console.log("Settings clicked")}
                                />
                                <div className="flex-1 overflow-hidden">
                                    <ChatMessagesList />
                                </div>
                                <ChatInput onSendMessage={() => {}} />
                            </>
                        )}
                    </div>
                )}
            </main>
        </>
    );
}
