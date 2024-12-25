"use client";

import { useEffect, useRef, useState } from "react";
import { ChatMessageItem } from "./ChatMessageItem";
import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../ChatState/store";
import * as Virtuoso from "react-virtuoso";
export const ChatMessagesList: React.FC = () => {
    const ref = useRef<Virtuoso.VirtuosoHandle>(null);

    const active = useSelector<RootState>((state) => state.active) as RootState["active"];
    const chatMessages = useSelector<RootState>((state) => state.messages) as RootState["messages"];

    // Scroll to bottom on new messages or chat change
    useEffect(() => {
        if (!ref.current) return;

        // Optional: Check if we're near bottom before scrolling

        // if (shouldScrollToBottom()) {
        //     scrollToBottom();
        // }

        // @ts-ignore
        ref.current.scrollToIndex(chatMessages[active]?.length - 1);
    }, [active, chatMessages]);

    return (
        <Virtuoso.Virtuoso
            ref={ref}
            data={chatMessages[active || ""]}
            alignToBottom
            
            itemContent={(idx) => {
                // @ts-ignore
                return <ChatMessageItem key={chatMessages[active][idx]?.id ?? ""} idx={idx} />;
            }}
            components={{ EmptyPlaceholder: () => <>Nothing yet</>, Footer: () => <div className="h-16"></div> }}
        />
    );
    // return (
    //     <div ref={ref} className="flex flex-col flex-1 h-full  w-full overflow-y-scroll relative">

    //         {(chatMessages[active || ""] ?? []).map((message, idx) => (
    //         ))}
    //     </div>
    // );
};
