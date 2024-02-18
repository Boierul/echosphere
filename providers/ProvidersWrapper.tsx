"use client";

import React from "react";

import {SessionProvider} from "next-auth/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";

export default function ProvidersWrapper({children}: {
    children: React.ReactNode;
}) {
    return (
        <SessionProvider>
            <NextThemesProvider attribute="class"
                                defaultTheme="light"
                                enableSystem
                // disableTransitionOnChange
            >
                {children}
            </NextThemesProvider>
        </SessionProvider>
    );
}
