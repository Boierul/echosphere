import Post from "@/app/feed/components/Post";
import {FeedInterface} from "@/types";

export default function Feed({posts}: FeedInterface) {
    console.log(posts)

    return (
        <main>

            {posts?.map((post) => (
                <Post
                    key={post.id}
                    id={post.id}
                    userId={post.user?.id}
                    name={post.user?.name}
                    avatar={post.user?.image}
                    createdAt={post.createdAt}
                    content={post.content}
                    likes={post.likes}
                    comments={post.comments}
                />
            ))}
        </main>
    )
}