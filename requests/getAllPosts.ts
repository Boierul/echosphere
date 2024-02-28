import process from "process";
import {unstable_noStore as noStore} from 'next/cache';

export async function getAllPosts() {
    noStore();
    const [posts] = await Promise.all([fetch(`${process.env.BASE_URL}/api/v1/feed`, { cache: 'no-cache' })]);
    return posts.json();
}
