"use client";

import { useEffect, useRef } from "react";
import { ChatMessageItem } from "./ChatMessageItem";
import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../ChatState/store";

export const ChatMessagesList: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);

    const active = useSelector<RootState>((state) => state.active) as RootState["active"];
    const chatMessages = useSelector<RootState>((state) =>
        state.state == "idel" ? state.messages[active] : [],
    ) as RootState["messages"][""];

    // Scroll to bottom on new messages or chat change
    // useEffect(() => {
    //     if (!ref.current) return;

    //     const scrollToBottom = () => {
    //         ref.current?.scrollTo({
    //             top: ref.current.scrollHeight,
    //             behavior: "smooth",
    //         });
    //     };

    //     // Optional: Check if we're near bottom before scrolling
    //     const shouldScrollToBottom = () => {
    //         if (!ref.current) return false;
    //         const { scrollTop, scrollHeight, clientHeight } = ref.current;
    //         return scrollHeight - scrollTop - clientHeight <= clientHeight / 3;
    //     };

    //     if (shouldScrollToBottom()) {
    //         scrollToBottom();
    //     }
    // }, [active, chatMessages]);

    return (
        <div ref={ref} className="flex flex-col flex-1 h-full overflow-y-auto relative">
            <div className="flex flex-col flex-1 min-h-0">
                {chatMessages &&
                    (chatMessages || []).map((message, idx) => (
                        <ChatMessageItem key={message.id} idx={idx} />
                    ))}
            </div>
        </div>
    );
};
