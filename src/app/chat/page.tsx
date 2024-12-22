"use client";

import { useCallback, useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { ChatHeader } from "./ChatHeader/ChatHeader";
import { ChatInput } from "./ChatInput/ChatInput";
import { ChatSidebar } from "./ChatSidebar/ChatSidebar";
import { ChatMessagesList } from "./ChatMessages/ChatMessagesList";
import { api } from "~/trpc/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, init, RootState } from "./ChatState/store";
import { useSession } from "next-auth/react";

export default function ChatPage() {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSession();
    const active = useSelector<RootState>((state) => state.active) as RootState["active"];

    const chats = api.chat.initialChats.useQuery();

    useEffect(() => {
        if (chats.data) {
            dispatch(init(chats.data));
        }
    }, [chats.status]);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = useCallback(() => {
        setIsSidebarOpen((prev) => !prev);
    }, []);

    return (
        <>
            {/* Mobile Menu Toggle */}
            <button
                onClick={toggleSidebar}
                className="fixed top-4 left-4 z-50 md:hidden"
                aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
                <Menu size={24} />
            </button>

            {/* Chat Window */}
            <main className="flex-1  flex h-full  w-full overflow-hidden">
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
