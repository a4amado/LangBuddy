"use client";

import { useEffect, useState, useRef } from "react";
import Pusher from "pusher-js";
import { X, Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";
import { ChatHeader } from "./ChatHeader/ChatHeader";
import { ChatInput } from "./ChatInput/ChatInput";
import { ChatMessagesList } from "./ChatMessages/ChatMessagesList";
import { ChatSidebar } from "./ChatSidebar/ChatSidebar";
import { LoadingSpinner } from "~/components/ui/loading";
import { addNewMessage, AppDispatch, init, RootState, toggleSideBar } from "./ChatState/store";
import { fetchNonExistingChat } from "./ChatState/actions/chatActions";

const PUSHER_KEY = "631df3862aa438e50863";
const PUSHER_CLUSTER = "eu";

export default function ChatPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { data: userData } = useSession();
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const active = useSelector<RootState>((state) => state.active) as RootState["active"];
    const messages = useSelector<RootState>((state) => state.messages) as RootState["messages"];
    const sidebarOpen = useSelector<RootState>(
        (state) => state.isSideBarOpen,
    ) as RootState["isSideBarOpen"];
    const loadingState = useSelector<RootState>((state) => state.state) as RootState["state"];

    const { data: chatsData, status: loadingChatsStatus } = api.chat.getAll.useQuery();

    const handleNewMessage = async (data: any) => {
        if (messages[data.chatId]) {
            dispatch(addNewMessage(data));
        } else {
            dispatch(fetchNonExistingChat({ payload: { chat_id: data.chatId }, type: "" }));
        }
    };

    const playNotificationSound = async () => {
        if (!audioRef.current || isPlaying) return;

        try {
            setIsPlaying(true);
            audioRef.current.currentTime = 0;
            await audioRef.current.play();
        } catch (error) {
            console.error("Audio play error:", error);
        } finally {
            setIsPlaying(false);
        }
    };

    useEffect(() => {
        if (loadingChatsStatus == "success") {
            dispatch(init(chatsData));
        }
    }, [loadingChatsStatus]);

    useEffect(() => {
        const pusher = new Pusher(PUSHER_KEY, { cluster: PUSHER_CLUSTER });
        const channel = pusher.subscribe(userData?.user.id || "");

        channel.bind("new_msg", async (data: any) => {
            await playNotificationSound();
            await handleNewMessage(data);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
            pusher.disconnect();
        };
    }, [isPlaying, userData?.user.id]);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 100);
        return () => clearTimeout(timer);
    }, [active]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleEnded = () => setIsPlaying(false);
        audio.addEventListener("ended", handleEnded);
        return () => audio.removeEventListener("ended", handleEnded);
    }, []);

    return (
        <>
            <audio ref={audioRef} src="/notification.mp3" />

            <button
                onClick={() => dispatch(toggleSideBar())}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-lg"
                aria-label="Toggle menu"
            >
                {sidebarOpen ? (
                    <X className="h-6 w-6 text-gray-600" />
                ) : (
                    <Menu className="h-6 w-6 text-gray-600" />
                )}
            </button>

            <div
                className={`
          fixed lg:static inset-0 z-40
          w-80 bg-white border-r
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
            >
                <div className="h-full overflow-y-auto pt-16 lg:pt-0">
                    <ChatSidebar />
                </div>
            </div>

            <main className="flex-1 flex h-full w-full overflow-hidden">
                {loadingState === "loading" && <LoadingSpinner />}
                {loadingState === "idel" && active && (
                    <div className="flex flex-col flex-1 w-full overflow-hidden">
                        <ChatHeader onSettingsClick={() => console.log("Settings clicked")} />
                        <div className="flex-1 overflow-hidden relative">
                            <div
                                className={`absolute z-10 ${isLoading ? "block" : "hidden"} w-full h-full top-0 left-0 bg-white`}
                            />
                            <ChatMessagesList />
                        </div>
                        <ChatInput onSendMessage={() => {}} />
                    </div>
                )}
            </main>
        </>
    );
}
