import React from "react";
import AddPostSkeleton from "@/app/feed/components/skeleton/AddPostSkeleton";
import FeedPostsSkeleton from "@/app/feed/components/skeleton/FeedPostsSkeleton";
import Spacer from "@/components/Spacer";

export default function Loading() {
    return (
        <main>
            <Spacer/>

            <div className="container mx-auto px-6 sm:px-8 md:px-16 lg:px-20 max-w-3xl mt-6 items-center">

                <h1 className="font-bold text-5xl">
                    Feed
                </h1>

                <div>
                    <AddPostSkeleton/>
                </div>

                <div>
                    <FeedPostsSkeleton/>
                </div>
            </div>
        </main>
    )
}