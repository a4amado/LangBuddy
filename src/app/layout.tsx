"use client";
import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";
import useLatestSeen from "~/utils/useLatestSeen";
import PageWrapper from "./_components/page-wrapper";

function LastSeenProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    useLatestSeen();
    return children;
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <SessionProvider>
            <html lang="en" className={`${GeistSans.variable}`}>
                <body>
                    <TRPCReactProvider>
                        <LastSeenProvider>{children}</LastSeenProvider>
                    </TRPCReactProvider>
                </body>
            </html>
        </SessionProvider>
    );
}
