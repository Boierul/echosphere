"use client"

import * as React from "react"
import Spacer from "@/components/Spacer";
import AddPostSkeleton from "@/app/feed/components/skeleton/AddPostSkeleton";
import FeedPostsSkeleton from "@/app/feed/components/skeleton/FeedPostsSkeleton";

export default function ModeToggle() {
    return (
        <main>
            <Spacer/>

            <div className="container max-w-2xl mt-10 items-center">

                <h1 className="font-bold text-stone-500 text-6xl mb-4 animate-pulse">
                    Feed
                </h1>

                <div className="mb-12">
                    <AddPostSkeleton/>
                </div>

                <div>
                    <FeedPostsSkeleton/>
                </div>
            </div>
        </main>
    )
}
