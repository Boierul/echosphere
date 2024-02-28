import process from "process";

export async function getAllPosts() {
    const [posts] = await Promise.all([fetch(`${process.env.BASE_URL}/api/v1/feed`, { cache: 'no-cache' })]);
    return posts.json();
}
