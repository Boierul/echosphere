import React from "react";
import AddPostSkeleton from "@/app/feed/components/skeleton/AddPostSkeleton";
import FeedPostsSkeleton from "@/app/feed/components/skeleton/FeedPostsSkeleton";
import Spacer from "@/components/Spacer";

export default function Loading() {
    return (
        <main>
            <Spacer/>

            <div className="container max-w-2xl mt-10 items-center ">
                <h1 className="font-bold text-6xl mb-0 md:mb-2 sm:mb-4 animate-pulse">
                    Feed
                </h1>

                <div className="mb-8">
                    <AddPostSkeleton/>
                </div>

                <div>
                    <FeedPostsSkeleton/>
                </div>
            </div>
        </main>
    )
}