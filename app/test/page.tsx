"use client"

import * as React from "react"
import {useState} from "react"
import {Button} from "@/components/ui/button";

import Spacer from "@/components/Spacer";
import {askChatGPTForSuggestion} from "@/requests/openaiSuggestion";
import {Textarea} from "@/components/ui/textarea";
import FeedPostsSkeleton from "@/app/feed/components/skeleton/FeedPostsSkeleton";
import AddPost from "@/app/feed/components/AddPost";
import Feed from "@/app/feed/components/Feed";
import AddPostSkeleton from "@/app/feed/components/skeleton/AddPostSkeleton";

export default function Test() {
    const [content, setContent] = useState("");

    const enhanceWithAI = async () => {
        const res = await askChatGPTForSuggestion(content);
        const GPTdata = await res.json();
        setContent(GPTdata.content);
    };
    return (
        <main>
            <Spacer/>

            <div className="container max-w-2xl mt-10 items-center">

            </div>

            {/*<div>*/}
            {/*    <Button*/}
            {/*        style={{marginLeft: 10, minWidth: "150px"}}*/}
            {/*        onClick={enhanceWithAI}*/}
            {/*    >*/}
            {/*        test*/}
            {/*    </Button>*/}
            {/*</div>*/}


            {/*<div>*/}
            {/*    <Textarea*/}
            {/*        placeholder="Give it a try and test it out"*/}
            {/*        className="resize-none h-24 rounded-lg"*/}
            {/*        onChange={(e) => setContent(e.target.value)}*/}
            {/*        value={content}*/}
            {/*    />*/}
            {/*</div>*/}

            {/*<div className="container max-w-2xl mt-10 items-center">*/}
            {/*    <h1 className="font-bold text-6xl mb-4 animate-pulse">*/}
            {/*        Feed*/}
            {/*    </h1>*/}

            {/*    <div className="mb-6 sm:mb-8">*/}
            {/*        <AddPostSkeleton/>*/}
            {/*    </div>*/}

            {/*    <div>*/}
            {/*        <FeedPostsSkeleton/>*/}
            {/*    </div>*/}
            {/*</div>*/}

        </main>
    )
}
