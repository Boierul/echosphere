import {NextResponse} from "next/server";
import {getAllPostsFromDB} from "@/prisma/CRUD";

/* GET - get all posts from the DB */
export async function GET() {
    try {
        const data = await getAllPostsFromDB();
        console.log("\x1b[34m  [GET METHOD] - \x1b[33mFEED ROUTE - api/v1/feed");

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