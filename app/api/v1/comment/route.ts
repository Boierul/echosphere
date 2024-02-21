import {NextRequest, NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {addComment, getUser} from "@/prisma/CRUD";

export async function POST(req: NextRequest, res: NextResponse) {
    const session = await getServerSession(authOptions);

    // Require AUTH in order to post
    if (!session) {
        return NextResponse.json(
            {message: `Please sign in to create a post.`},
            {status: 401}
        )
    }

    // Get the request body
    const {postId, content} = JSON.parse(await req.text());
    // Get user from database
    const prismaUser = await getUser(session?.user?.email);

    // Create comment
    try {
        const comment = await addComment(content, postId, prismaUser?.id);
        console.log(`\x1b[34m  [POST METHOD] - \x1b[33mapi/v1/comment - \x1b[0m Add a commet - \x1b[36m${postId} - \x1b[0mUser ID - \x1b[36m${prismaUser?.id}`);
        return NextResponse.json(comment)
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