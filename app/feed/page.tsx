import Spacer from "@/components/Spacer";
import AddPost from "@/app/feed/components/AddPost";
import Feed from "@/app/feed/components/Feed";

import {getAllPosts} from "@/requests";

export default async function FeedPage() {
    // const [postsData] = await Promise.all([getAllPosts()])

    const postsData = [
        {
            id: 'clt253yds000d10rwcnze63qo',
            createdAt: '2024-02-25T23:27:28.721Z',
            updatedAt: '2024-02-25T23:27:28.721Z',
            content: 'Second Comment',
            published: false,
            userId: 'clt252blq000710rw2kzg6oxh',
            user: {
                id: 'clt252blq000710rw2kzg6oxh',
                stripeCustomerId: null,
                subscriptionId: null,
                subscriptionStatus: null,
                name: '279 487',
                email: 'email@gmail.com',
                emailVerified: null,
                image: 'https://lh3.googleusercontent.com/a/ACg8ocIyuheTIud3VHfjJcDWU3GMHXl_HqEZaIYU_W_gAefm=s96-c'
            },
            likes: [],
            comments: [ ]
        },
        {
            id: 'clt24xj9i000610rwx9f3prqu',
            createdAt: '2024-02-25T23:22:29.191Z',
            updatedAt: '2024-02-25T23:22:29.191Z',
            content: 'First comment',
            published: false,
            userId: 'clt24uktt000010rwm591czqs',
            user: {
                id: 'clt24uktt000010rwm591czqs',
                stripeCustomerId: null,
                subscriptionId: null,
                subscriptionStatus: 'active',
                name: 'Dan Pintea',
                email: 'email2@gmail.com',
                emailVerified: null,
                image: 'https://avatars.githubusercontent.com/u/49337867?v=4'
            },
            likes: [],
            comments: []
        }
    ]


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