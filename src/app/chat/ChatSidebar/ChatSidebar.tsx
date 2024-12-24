"use client";

import { ChatSidebarBody } from "./ChatSidebarBody";

interface ChatSidebarProps {
    isOpen: boolean;
    onCloseSidebar: () => void;
}

export const ChatSidebar: React.FC = () => {
    return (
        <div className={` h-full overflow-hidden`}>
            <ChatSidebarBody />
        </div>
    );
};
