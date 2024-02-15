import React from "react";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {DotsHorizontalIcon} from "@radix-ui/react-icons";

const FeedPostsSkeleton = () => {
    const renderCards = () => {
        const posts = [];
        for (let i = 0; i < 3; i++) {
            posts.push(
                <Card key={i} className="p-2 my-4 rounded-lg animate-pulse">
                    <div className="flex flex-row items-center p-4">
                        <div className="w-12 h-12 bg-zinc-100 rounded-full">
                        </div>

                        <div className="flex justify-between w-full">
                            <div className="pl-4">
                                <div
                                    className="mb-1 w-60 rounded-md text-transparent bg-zinc-100 dark:bg-zinc-800">Username
                                </div>
                                <div
                                    className="text-sm text-transparent w-60 rounded-md bg-zinc-100 dark:bg-zinc-800">Date
                                </div>
                            </div>

                            <Button variant="ghost" disabled={true} style={{
                                marginTop: "-4px"
                            }}>
                                <DotsHorizontalIcon/>
                            </Button>
                        </div>
                    </div>

                    <div className="p-4">
                        <p className="pr-4 mb-1 rounded-md text-transparent bg-zinc-100 dark:bg-zinc-800">
                            Post
                        </p>
                        <p className="pr-4 rounded-md text-transparent bg-zinc-100 dark:bg-zinc-800">
                            Post
                        </p>
                    </div>

                    <div className="p-4 flex gap-3 items-center">
                        <p className="rounded-md text-transparent bg-zinc-100 dark:bg-zinc-800 text-sm">
                            Likes No.
                        </p>

                        <p className="rounded-md text-transparent bg-zinc-100 dark:bg-zinc-800 text-sm">
                            Comments No.
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