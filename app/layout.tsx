import "./globals.css";

import React from "react";
import {GeistSans} from 'geist/font/sans';
import type {Metadata} from "next";
import {Inter} from "next/font/google";

import {ThemeProvider} from "@/providers/ThemeProvider";
import NavigationBar from "@/components/NavigationBar";
import {Toaster} from "@/components/ui/toaster";

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
        <html lang="en">
        <body className={GeistSans.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            // disableTransitionOnChange
        >
            <NavigationBar/>
            {children}
        </ThemeProvider>
        <Toaster />
        </body>
        </html>
    );
}
