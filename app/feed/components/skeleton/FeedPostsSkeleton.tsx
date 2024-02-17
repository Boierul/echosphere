import React from "react";
import {Card} from "@/components/ui/card";

// TODO: Adjust it to the main Feed
const FeedPostsSkeleton = () => {
    const renderCards = () => {
        const posts = [];
        for (let i = 0; i < 3; i++) {
            posts.push(
                <Card key={i} className="p-2 my-4 rounded-lg animate-pulse">
                    <div className="flex flex-row items-center p-4">
                        <div className="w-12 h-12 bg-zinc-100 rounded-full">
                        </div>

                        <div className="flex justify-between w-10/12">
                            <div className="pl-4">
                                <div
                                    className="mb-1 w-32 rounded-md text-transparent bg-zinc-100 dark:bg-zinc-800 sm:w-60">Username
                                </div>
                                <div
                                    className="text-sm text-transparent w-32 rounded-md bg-zinc-100 dark:bg-zinc-800 sm:w-60">Date
                                </div>
                            </div>

                            {/*<Button variant="ghost" disabled={true} style={{*/}
                            {/*    marginTop: "-4px",*/}
                            {/*    right: "12px",*/}
                            {/*}}>*/}
                            {/*    <DotsHorizontalIcon/>*/}
                            {/*</Button>*/}
                        </div>
                    </div>

                    <div className="px-4">
                        <p className="pr-4 mb-1 rounded-md text-transparent bg-zinc-100 dark:bg-zinc-800">
                            Post
                        </p>
                    </div>

                    <div className="p-4 flex gap-1 items-center">
                        <p className="rounded-md text-transparent bg-zinc-100 dark:bg-zinc-800 text-sm">
                            Likes
                        </p>

                        <p className="rounded-md text-transparent bg-zinc-100 dark:bg-zinc-800 text-sm">
                            Comm
                        </p>

                        <p className="rounded-md text-transparent bg-zinc-100 dark:bg-zinc-800 text-sm">
                            Delete post
                        </p>
                    </div>
                </Card>
            );
        }
        return posts;
    };

    return <div>{renderCards()}</div>;
};

export default FeedPostsSkeleton;