import {NextRequest, NextResponse} from "next/server";
import {getAllPostComments} from "@/prisma/CRUD";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        // Get the request body
        const {postId} = JSON.parse(await req.text());

        if (!postId) {
            return NextResponse.json(
                { message: "postId parameter is required" },
                { status: 400 }
            );
        }

        const post = await getAllPostComments(postId as string);

        if (!post) {
            return NextResponse.json(
                {message: "Post not found"},
                {status: 404}
            )
        }
        console.log(`\x1b[34m  [POST METHOD] - \x1b[33m api/v1/comments - \x1b[0m Fetch all comments for a post - \x1b[36m${postId}`);

        return NextResponse.json(post)
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