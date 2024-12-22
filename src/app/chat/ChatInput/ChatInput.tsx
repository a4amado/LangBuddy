"use client";

import { useCallback, useState } from "react";
import { Send } from "lucide-react";

import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";
import { useSelector } from "react-redux";
import { RootState } from "../ChatState/store";

interface ChatInputProps {
    onSendMessage: (message: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
    const [message, setMessage] = useState("");
    const { data: session } = useSession();
    const { mutate: sendMessage } = api.message.send.useMutation();
    const active = useSelector<RootState>((state) => state.active) as RootState["active"];
    const chats = useSelector<RootState>((state) => state.chats) as RootState["chats"];
    const handleSendMessage = useCallback(() => {
        if (message.trim() && session?.user?.id) {
            sendMessage({ content: message, chatId: active || "" });
            setMessage("");
        }
    }, [message, sendMessage, session?.user?.id]);

    const handleKeyPress = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
                handleSendMessage();
            }
        },
        [handleSendMessage],
    );

    return (
        <div className="p-4 border-t bg-white flex items-center">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={handleKeyPress}
            />
            <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600"
                aria-label="Send message"
            >
                <Send size={20} />
            </button>
        </div>
    );
};
