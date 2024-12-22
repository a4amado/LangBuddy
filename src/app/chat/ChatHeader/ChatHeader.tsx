"use client";


interface ChatHeaderProps {
    chatId: string;
    onSettingsClick?: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onSettingsClick }) => {
    return (
        <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
            <h3 className="text-lg font-semibold">USername</h3>
            <button
                className="text-gray-500 hover:text-gray-700"
                aria-label="Chat settings"
                onClick={onSettingsClick}
            >
                ⚙️
            </button>
        </div>
    );
};
