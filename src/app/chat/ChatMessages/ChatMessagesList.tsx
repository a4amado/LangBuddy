import { useEffect, useRef, useState } from "react";
import { ChatMessageItem } from "./ChatMessageItem";
import { useSelector } from "react-redux";
import { RootState } from "../ChatState/store";
import * as Virtuoso from "react-virtuoso";

export const ChatMessagesList = () => {
    const ref = useRef<Virtuoso.VirtuosoHandle>(null);
    const active = useSelector<RootState>((state) => state.active) as RootState["active"];
    const chatMessages = useSelector<RootState>((state) => state.messages) as RootState["messages"];
    const activeChat = chatMessages[active] ?? [];
    const [atBottom, setAtBottom] = useState(true);

    useEffect(() => {
        // Only scroll to bottom if user was already at bottom
        ref.current?.scrollToIndex({
            index: activeChat.length - 1,
            behavior: 'auto'
        });
        
    }, []);


    useEffect(() => {
        // Only scroll to bottom if user was already at bottom
        if (atBottom) {
            const timer = setTimeout(() => {
                ref.current?.scrollToIndex({
                    index: activeChat.length - 1,
                    behavior: 'auto'
                });
            }, 50);
            
            return () => clearTimeout(timer);
        }
    }, [active, activeChat.length, atBottom]);

    return (
        <div className="h-full w-full">
            <Virtuoso.Virtuoso
                ref={ref}
                data={activeChat}
                alignToBottom
                followOutput="smooth"
                atBottomThreshold={100}
                initialItemCount={activeChat.length}
                itemContent={(index) => (
                    <ChatMessageItem key={activeChat[index]?.id} idx={index} />
                )}
                style={{ height: '100%' }}
                components={{
                    Footer: () => <div className="h-2" />
                }}
                atBottomStateChange={(isAtBottom) => {
                    setAtBottom(isAtBottom);
                }}
            />
        </div>
    );
};

export default ChatMessagesList;