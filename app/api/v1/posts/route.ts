import {NextRequest, NextResponse} from "next/server";
import {getUser, postSinglePostToDB} from "@/prisma/CRUD";

import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

/* POST - add a posts to the DB */
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
    const {content} = JSON.parse(await req.text());

    // Get user from the DB
    const prismaUser = await getUser(session?.user?.email || undefined);

    // Create posts
    try {
        const post = await postSinglePostToDB(content as string, prismaUser?.id as string)
        console.log('\x1b[34m  [POST METHOD] - \x1b[33mPOSTS ROUTE - api/v1/posts');

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
