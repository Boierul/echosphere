import Spacer from "@/components/Spacer";
import AddPost from "@/app/feed/components/AddPost";
import Feed from "@/app/feed/components/Feed";

export default async function FeedPage() {
    // const [postsData] = await Promise.all([getAllPosts()])

    return (
        <main>
            <Spacer/>

            {/*<div className="container mx-auto px-6 sm:px-8 md:px-16 lg:px-20 max-w-8xl mt-6 items-center">*/}
            <div className="container max-w-2xl mt-10 items-center">

                <h1 className="font-bold text-6xl mb-4">
                    Feed
                </h1>

                <div className="mb-12">
                    <AddPost/>
                </div>

                {/*<Feed posts={postsData}/>*/}
                <div>
                    <Feed/>
                </div>
            </div>
        </main>
    )
}