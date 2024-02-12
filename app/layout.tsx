import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/providers/ThemeProvider";
import React from "react";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Echosphere",
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
        <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            // disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}
