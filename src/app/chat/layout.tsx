"use client";

import { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store, toggleSideBar } from "./ChatState/store";
import PageWrapper from "../_components/page-wrapper";
import useProtected from "~/utils/useProtected";
import { Menu, X } from "lucide-react";
import { ChatSidebar } from "./ChatSidebar/ChatSidebar";

export default function ChatLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    useEffect(() => {
        document.title = "Chat";
    }, []);
    useProtected();

    return (
        <PageWrapper>
            <Provider store={store}>
                <div className="w-full h-full overflow-hidden flex">{children}</div>
            </Provider>
        </PageWrapper>
    );
}
