"use client";

import { useCallback, useState } from "react";
import { Send } from "lucide-react";

import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";
import { useDispatch, useSelector } from "react-redux";
import { addNewMessage, AppDispatch, RootState } from "../ChatState/store";

interface ChatInputProps {
    onSendMessage: (message: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
    const [message, setMessage] = useState("");
    const { data: session } = useSession();
    const dispatch = useDispatch<AppDispatch>();
    const { mutate: sendMessage } = api.messege.send.useMutation({
        onSuccess(data) {
            dispatch(addNewMessage(data));
        },
    });
    const active = useSelector<RootState>((state) => state.active) as RootState["active"];
    const chats = useSelector<RootState>((state) => state.chats) as RootState["chats"];
    const handleSendMessage = useCallback(() => {
        if (message.trim() && session?.user?.id) {
            sendMessage({ content: message, chatId: active || "" });
            setMessage("");
        }
    }, [message, sendMessage, session?.user?.id]);
    const chat = chats.find((chat) => chat.id == active);
    const user = useSession();
    const otherUser = chat?.members.find((member) => member.id != user.data?.user.id) ?? {
        id: "deleted",
        image: "/delete-user.webp",
        name: "Deleted User",
    };
    const handleKeyPress = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
                handleSendMessage();
            }
        },
        [handleSendMessage],
    );
    const disabled = otherUser.id == "deleted";
    const text = disabled ? "This user deleted his Account, you can't messege him/her" : message;
    return (
        <div className="p-4 border-t bg-white flex items-center">
            <input
                type="text"
                value={text}
                disabled={disabled}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className={`flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${disabled && "text-red-600"}`}
                onKeyPress={handleKeyPress}
            />
            <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600"
                aria-label="Send message"
                disabled={disabled}
            >
                <Send size={20} />
            </button>
        </div>
    );
};
