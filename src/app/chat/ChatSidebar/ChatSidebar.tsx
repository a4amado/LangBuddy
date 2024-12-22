"use client";

import { ChatSidebarBody } from "./ChatSidebarBody";
// components/ChatSidebar/ChatSidebar.tsx
import { ChatSidebarHeader } from "./ChatSidebarHeader";

interface ChatSidebarProps {
    isOpen: boolean;

    onCloseSidebar: () => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
    isOpen,
    onCloseSidebar,
}) => {
    return (
        <div
            className={`
        fixed inset-y-0 left-0 z-40 w-64 
        transform transition-transform duration-300 
        md:static md:block
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        bg-gray-100 
        border-r
      `}
        >
            <ChatSidebarHeader title="Chats" onCloseSidebar={onCloseSidebar} />
            <ChatSidebarBody  />
        </div>
    );
};
