import "~/styles/globals.css";

import { TRPCReactProvider } from "~/trpc/react";

import { Inter } from "next/font/google";
import { Metadata } from "next";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
    openGraph: {
        images: [
            {
                url: "https://lang-buddy.vercel.app/langbuddy.webp", // Replace with your actual domain
            },
        ],
    },
};
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
