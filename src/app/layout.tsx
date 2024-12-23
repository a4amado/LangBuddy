"use client";
import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { type Metadata } from "next";
import { headers } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "LangBuddy - Language Learning Community",
  description: "Connect with language learners worldwide",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.variable
      )}>
        <TRPCReactProvider headers={headers()}>
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
