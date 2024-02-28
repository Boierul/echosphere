// Solves the caching request and allows dynamic SSR
// export const dynamic = "force-dynamic";
// or
import {unstable_noStore} from "next/cache";

import Spacer from "@/components/Spacer";
import AddPost from "@/app/feed/components/AddPost";
import Feed from "@/app/feed/components/Feed";
import {getAllPosts} from "@/requests";

export default async function FeedPage() {
    const postsData = await getEveryPost();

    async function getEveryPost() {
        const [posts] = await Promise.all([getAllPosts(), { cache: 'no-store' }]);
        return posts;
    }

    return (
        <main>
            <Spacer/>

            <div className="container max-w-2xl mt-10 items-center">
                <h1 className="font-bold text-6xl mb-0 md:mb-2 sm:mb-4">
                    Feed
                </h1>

                <div className="mb-6 sm:mb-8">
                    <AddPost/>
                </div>

                <div>
                    <Feed posts={postsData}/>
                </div>
            </div>
        </main>
    )
}