import process from "process";

export async function getAllPostsClient() {
    const [posts] = await Promise.all([fetch(`/api/v1/feed`, { cache: 'no-cache' })]);
    return posts.json();
}
