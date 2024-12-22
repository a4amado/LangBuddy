"use client";

import { Provider } from "react-redux";
import { store } from "./ChatState/store";
import PageWrapper from "../_components/page-wrapper";

export default function ChatLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <PageWrapper>
    <Provider store={store}>{children}</Provider></PageWrapper>
}
