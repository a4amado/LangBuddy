import { useEffect, useRef, useState } from "react";
import { ChatMessageItem } from "./ChatMessageItem";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, loadMoreToState, RootState } from "../ChatState/store";
import * as Virtuoso from "react-virtuoso";
import { Button } from "antd";
import { client } from "~/trpc/fetch";
import { TRPCError } from "@trpc/server";
import { MoreVertical } from "lucide-react";

export const ChatMessagesList = () => {
    const ref = useRef<Virtuoso.VirtuosoHandle>(null);
    const active = useSelector<RootState>((state) => state.active) as RootState["active"];
    const chatMessages = useSelector<RootState>((state) => state.messages) as RootState["messages"];
    const activeChat = chatMessages[active] ?? [];
    const [atBottom, setAtBottom] = useState(true);
    const [loadingMoreMessages, setLoadingMoreMessages] = useState(false);
    const [done, setDone] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        // Only scroll to bottom if user was already at bottom
        ref.current?.scrollToIndex({
            index: activeChat.length - 1,
            behavior: "auto",
        });
    }, []);

    useEffect(() => {
        // Only scroll to bottom if user was already at bottom
        if (atBottom) {
            const timer = setTimeout(() => {
                ref.current?.scrollToIndex({
                    index: activeChat.length - 1,
                    behavior: "auto",
                });
            }, 50);

            return () => clearTimeout(timer);
        }
    }, [active, activeChat.length, atBottom]);

    const [lastFetch, setLastFetch] = useState(0);
    useEffect(() => {
        ref.current?.scrollToIndex({
            index: lastFetch,
            behavior: "auto",
            align: "center",
        });
    }, [lastFetch]);

    async function loadMore({ chatId }: { chatId: string }) {
        setLoadingMoreMessages(true);
        try {
            const messages = await client.messege.getMessagesByChatId.query({
                chatId: chatId,
                skip: chatMessages[chatId]?.length ?? 0,
            });

            if (messages instanceof TRPCError) {
                console.error("Error loading messages:", messages);
                return;
            }

            if (!messages || messages.length === 0) {
                setDone(true);
                return;
            }

            dispatch(loadMoreToState(messages));

            setLastFetch(messages.length);
        } catch (error) {
            console.error("Error loading messages:", error);
        } finally {
            setLoadingMoreMessages(false);
        }
    }

    return (
        <div className="h-full w-full">
            <Virtuoso.Virtuoso
                ref={ref}
                data={activeChat}
                alignToBottom
                followOutput="smooth"
                atBottomThreshold={100}
                initialItemCount={activeChat.length}
                itemContent={(index) => <ChatMessageItem key={activeChat[index]?.id} idx={index} />}
                style={{ height: "100%" }}
                components={{
                    Footer: () => <div className="h-2" />,
                    Header: () => (
                        <div>
                            <Button
                                onClick={() => {
                                    console.log("Here");

                                    loadMore({ chatId: active });
                                }}
                                size="large"
                                loading={loadingMoreMessages}
                                disabled={done ?? loadingMoreMessages}
                                className="mx-auto block m-2"
                            >
                                {done && "Nothing more to fetch"}
                                {!done && "Load More"}
                            </Button>
                        </div>
                    ),
                }}
                atBottomStateChange={(isAtBottom) => {
                    setAtBottom(isAtBottom);
                }}
            />
        </div>
    );
};

export default ChatMessagesList;
