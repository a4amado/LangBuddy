"use client";
import "~/styles/globals.css";

import { TRPCReactProvider } from "~/trpc/react";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
            <meta property="og:image" content="langbuddy.webp" />

            </head>
            <body className={inter.className}>
                <TRPCReactProvider>{children}</TRPCReactProvider>
            </body>
        </html>
    );
}
