"use client"

import * as React from "react"
import Spacer from "@/components/Spacer";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {useTheme} from "next-themes";
import TechnologiesCardsV2 from "@/app/(home)/components/TechnologiesCardsV2";

// import {GeistMono} from 'geist/font/mono';
// import {GeistSans} from "geist/font/sans";
// import {Space_Grotesk, Inter, DM_Sans} from "next/font/google";
//
// const inter = Inter({subsets: ["latin"]});
// const spaceGrotesk = Space_Grotesk({subsets: ["latin"]});
// const dmSerifDisplay = DM_Sans({weight: "400", subsets: ["latin"]});

// <div>
//     <Spacer/>
//     <h1>Testing ground</h1>
//      <p className={`${dmSerifDisplay.className} mt-3 mb-3 text-white text-center text-opacity-80 mb-10`}>
//          App directory, routing, layouts, and API routes.
//      </p>
// </div>

export default function ModeToggle() {
    const {theme, setTheme} = useTheme();

    return (
        <div>
            <Spacer/>
            <Spacer/>

            <TechnologiesCardsV2/>
        </div>
    )
}
