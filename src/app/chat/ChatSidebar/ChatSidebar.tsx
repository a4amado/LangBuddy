"use client";

import { ChatSidebarBody } from "./ChatSidebarBody";
import { ChatSidebarHeader } from "./ChatSidebarHeader";

interface ChatSidebarProps {
    isOpen: boolean;
    onCloseSidebar: () => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({ isOpen, onCloseSidebar }) => {
    return (
        <div className="w-full max-w-60 h-full overflow-hidden" onClick={onCloseSidebar}>
            <ChatSidebarHeader title="Chats" onCloseSidebar={onCloseSidebar} />
            <div className="h-full overflow-y-auto">
                <ChatSidebarBody />
            </div>
        </div>
    );
};
