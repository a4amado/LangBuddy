"use client";

import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import { Menu } from "lucide-react";
import { ChatHeader } from "./ChatHeader/ChatHeader";
import { ChatInput } from "./ChatInput/ChatInput";
import { ChatSidebar } from "./ChatSidebar/ChatSidebar";
import { ChatMessagesList } from "./ChatMessages/ChatMessagesList";
import { api } from "~/trpc/react";

import { useDispatch, useSelector } from "react-redux";
import { addNewMessage, AppDispatch, init, RootState } from "./ChatState/store";
import { useSession } from "next-auth/react";

// Initialize Pusher
Pusher.logToConsole = true;
 
  
export default function ChatPage() {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSession();
    const active = useSelector<RootState>((state) => state.active) as RootState["active"];
    const chats = api.chat.getAll.useQuery();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    

    useEffect(() => {
        // Initialize Pusher
        const pusher = new Pusher('e52b6be16531b104cc75', {
            cluster: 'eu'
        });

        // Subscribe to channel
        const channel = pusher.subscribe(user.data?.user.id || "");

        // Bind to event
        channel.bind('new_msg', async function(data: any) {
            dispatch(addNewMessage(data as any))
            
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

    return (
        <>
            <button
                onClick={toggleSidebar}
                className="fixed top-4 left-4 z-50 md:hidden"
                aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
                <Menu size={24} />
            </button>

            <main className="flex-1 flex h-full w-full overflow-hidden">
                <ChatSidebar isOpen={isSidebarOpen} onCloseSidebar={toggleSidebar} />

                <div className="flex flex-col flex-1 w-full overflow-hidden">
                    {active && (
                        <>
                            <ChatHeader
                                chatId={active}
                                onSettingsClick={() => console.log("Settings clicked")}
                            />
                            <div className="flex-1 overflow-hidden">
                                <ChatMessagesList />
                            </div>
                            <ChatInput onSendMessage={() => {}} />
                        </>
                    )}
                </div>
            </main>
        </>
    );
}