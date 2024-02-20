import {NextRequest, NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {getUser, likePost, postAlreadyLiked, unlikePost} from "@/prisma/CRUD";

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
    const {postId} = JSON.parse(await req.text());

    const prismaUser = await getUser(session?.user?.email);
    if (!prismaUser) {
        return NextResponse.json(
            {message: `User does not exist.`},
            {status: 404}
        )
    }

    // Check if user has already liked the post
    const alreadyLiked = await postAlreadyLiked(postId, prismaUser?.id as string);

    try {
        if (!alreadyLiked) {
            // Create like if user has not liked the post
            const likeAPost = await likePost(postId, prismaUser?.id);
            console.log(`\x1b[34m  [POST METHOD] - \x1b[33mapi/v1/like - \x1b[0m Like post - \x1b[36m${postId} - \x1b[0mUser ID - \x1b[36m${prismaUser?.id}`);
            return NextResponse.json({
                likeAPost,
                message: "Post Liked"
            })
        } else {
            // Delete like if user has already liked the post
            const unlikeAPost = await unlikePost(alreadyLiked.id);
            console.log(`\x1b[34m  [POST METHOD] - \x1b[33mapi/v1/like - \x1b[0m Unlike post - \x1b[36m${postId} - \x1b[0mUser ID - \x1b[36m${prismaUser?.id}`);
            return NextResponse.json({
                unlikeAPost,
                message: "Post Unliked"
            })
        }
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