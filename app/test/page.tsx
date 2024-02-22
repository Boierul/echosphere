import * as React from "react"
import Spacer from "@/components/Spacer";
import {getAllPosts} from "@/requests";
import TestPage from "@/app/test/TestPage";

export default async function Test() {
    const [postsData] = await Promise.all([getAllPosts()])

    return (
        <main>
            <Spacer/>

            <div className="container max-w-2xl mt-10 items-center">
                {/*<div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">*/}
                <TestPage/>
                {/*</div>*/}
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