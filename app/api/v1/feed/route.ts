import {NextResponse} from "next/server";
import {getAllPostsFromDB} from "@/prisma/CRUD";
import {unstable_noStore as noStore} from 'next/cache';

/* GET - get all posts from the DB */
export async function GET() {
    noStore();

    try {
        const data = await getAllPostsFromDB();
        console.log("\x1b[32m  [GET METHOD] - \x1b[33m api/v1/feed - \x1b[0m Fetch all posts");

        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(
            {
                message: "Internal server error",
                error: `${error}`
            },
            {status: 500}
        )
    }
}