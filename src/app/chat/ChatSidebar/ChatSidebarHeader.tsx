"use client";

// components/ChatSidebar/ChatSidebarHeader.tsx
import React from "react";
import { X } from "lucide-react";

interface ChatSidebarHeaderProps {
    title: string;
    onCloseSidebar: () => void;
}

export const ChatSidebarHeader: React.FC<ChatSidebarHeaderProps> = ({ title, onCloseSidebar }) => {
    return (
        <div className="flex justify-between items-center p-4">
            <h2 className="text-xl font-bold">{title}</h2>
            <button onClick={onCloseSidebar} className="md:hidden" aria-label="Close sidebar">
                <X size={24} />
            </button>
        </div>
    );
};
