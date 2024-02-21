import "./globals.css";

import React from "react";
import {GeistSans} from 'geist/font/sans';
import type {Metadata} from "next";
import {Inter} from "next/font/google";

import NavigationBar from "@/components/NavigationBar";
import {Toaster} from "@/components/ui/toaster";
import ProvidersWrapper from "@/providers/ProvidersWrapper";

// const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Echosphere.",
    description: "Bootstrapped by Boierul",
    keywords: [
        "Next.js",
        "React",
        "TypeScript",
        "NextUI",
    ],
    authors: [
        {
            name: "Dan Pintea",
            url: "https://github.com/Boierul",
        },
    ],
    creator: "Dan Pintea",
    publisher: "Dan Pintea",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" className="no-scrollbar overflow-y-scroll">
        <body className={`${GeistSans.className} selection:bg-stone-900 selection:text-white dark:selection:bg-stone-600`}>
        <ProvidersWrapper>
            <NavigationBar/>
            {children}
        </ProvidersWrapper>
        <Toaster />
        </body>
        </html>
    );
}
