"use client";

import { useEffect, useState, useRef } from "react";
import Pusher from "pusher-js";
import { ChatHeader } from "./ChatHeader/ChatHeader";
import { ChatInput } from "./ChatInput/ChatInput";

import { ChatMessagesList } from "./ChatMessages/ChatMessagesList";
import { api } from "~/trpc/react";

import { useDispatch, useSelector } from "react-redux";
import {
    addNewMessage,
    AppDispatch,
    
    init,
    RootState,
    toggleSideBar,
} from "./ChatState/store";

import { useSession } from "next-auth/react";
import { LoadingSpinner } from "~/components/ui/loading";
import { X } from "lucide-react";
import { Menu } from "antd";
import { ChatSidebar } from "./ChatSidebar/ChatSidebar";
import { fetchNonExistingChat } from "./ChatState/actions/chatActions";

// Initialize Pusher
Pusher.logToConsole = true;

export default function ChatPage() {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSession();
    const active = useSelector<RootState>((state) => state.active) as RootState["active"];
    const messeges = useSelector<RootState>((state) => state.messages) as RootState["messages"];
    const chats = api.chat.getAll.useQuery();
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        // Initialize Pusher
        const pusher = new Pusher("e52b6be16531b104cc75", {
            cluster: "eu",
        });

        // Subscribe to channel
        const channel = pusher.subscribe(user.data?.user.id || "");

        // Bind to event
        channel.bind("new_msg", async function (data: any) {
            // Play notification sound
            if (audioRef.current && !isPlaying) {
                try {
                    setIsPlaying(true);
                    audioRef.current.currentTime = 0; // Reset audio to start
                    const playPromise = audioRef.current.play();
                    if (playPromise !== undefined) {
                        playPromise
                            .catch((e) => console.log("Audio play failed:", e))
                            .finally(() => setIsPlaying(false));
                    }
                } catch (error) {
                    console.log("Audio play error:", error);
                    setIsPlaying(false);
                }
            }

            if (messeges[data.chatId]) {
                dispatch(addNewMessage(data as any));
            } else {
                dispatch(
                    fetchNonExistingChat({
                        payload: { chat_id: data.chatId },
                        type: "",
                    }),
                );
            }
        });

        // Initialize chats
        if (chats.data) {
            for (const key in chats.data.messages) {
                chats.data.messages[key]?.sort((a, b) => {
                    const timeA = new Date(a.createdAt ?? "").getTime();
                    const timeB = new Date(b.createdAt ?? "").getTime();
                    return timeA - timeB;
                });
            }

            dispatch(init(chats.data));
        }

        // Cleanup
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
            pusher.disconnect();
        };
    }, [chats.status, isPlaying]);

    const SidebarOpen = useSelector<RootState>(
        (state) => state.isSideBarOpen,
    ) as RootState["isSideBarOpen"];

    const loading = useSelector<RootState>((state) => state.state) as RootState["state"];
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const t = setTimeout(() => {
            setLoading(false);
        }, 100);
        return () => clearTimeout(t);
    }, [active]);

    // Add event listeners for audio
    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            const handleEnded = () => setIsPlaying(false);
            audio.addEventListener("ended", handleEnded);
            return () => {
                audio.removeEventListener("ended", handleEnded);
            };
        }
    }, []);

    return (
        <>
            <audio ref={audioRef} src="/notification.mp3" />

            {/* Mobile Menu Button */}
            <button
                onClick={() => {
                    dispatch(toggleSideBar());
                }}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-lg"
                aria-label="Toggle menu"
            >
                {SidebarOpen ? (
                    <X className="h-6 w-6 text-gray-600" />
                ) : (
                    <Menu className="h-6 w-6 text-gray-600" />
                )}
            </button>

            {/* Chat Sidebar */}
            <div
                className={`
                            fixed lg:static inset-0 z-40
                            w-80 bg-white border-r
                            transform transition-transform duration-300 ease-in-out
                            ${SidebarOpen ? "translate-x-0" : "-translate-x-full"}
                            lg:translate-x-0
                        `}
            >
                <div className="h-full overflow-y-auto pt-16 lg:pt-0">
                    <ChatSidebar />
                </div>
            </div>

            <main className="flex-1 flex h-full w-full overflow-hidden">
                {loading == "loading" && <LoadingSpinner />}
                {loading == "idel" && (
                    <div className="flex flex-col flex-1 w-full overflow-hidden">
                        {active && (
                            <>
                                <ChatHeader
                                    onSettingsClick={() => console.log("Settings clicked")}
                                />
                                <div className="flex-1 overflow-hidden relative">
                                    <div
                                        className={`absolute z-10 ${isLoading ? "block" : "hidden"} w-full h-full top-0 left-0 bg-white`}
                                    ></div>
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
