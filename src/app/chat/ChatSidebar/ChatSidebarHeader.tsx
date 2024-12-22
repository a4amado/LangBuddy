import { X } from "lucide-react";

interface ChatSidebarHeaderProps {
    title: string;
    onCloseSidebar: () => void;
}

export const ChatSidebarHeader: React.FC<ChatSidebarHeaderProps> = ({ title, onCloseSidebar }) => {
    return (
        <div className="h-16 flex items-center justify-between px-4 border-b bg-white">
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            <button
                onClick={onCloseSidebar}
                className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
            >
                <X className="h-6 w-6" />
            </button>
        </div>
    );
};
