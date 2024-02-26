import process from "process";

export async function getAllPosts() {
    const [posts] = await Promise.all([fetch(`/api/v1/feed`, { cache: 'no-cache' })]);
    return posts.json();
}
