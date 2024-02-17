import {NextRequest, NextResponse} from "next/server";
import {getSinglePostFromDB} from "@/prisma/CRUD";

/* GET - get a single post from the DB */
export async function GET(req: NextRequest, res: NextResponse): Promise<NextResponse> {
    try {
        const postId = req.nextUrl.pathname.split('/').pop();

        const post = await getSinglePostFromDB(postId as string);

        if (!post) {
            return NextResponse.json(
                {message: "Post not found"},
                {status: 404}
            )
        }

        console.log("\x1b[34m  [GET METHOD] - \x1b[33mPOSTS ROUTE - api/test/:id");
        return NextResponse.json(post)
    } catch (error) {
        // TODO: Refactor status codes for more appropriate ones
        return NextResponse.json(
            {
                message: "Internal server error",
                error: `${error}`
            },
            {status: 500}
        )
    }
}