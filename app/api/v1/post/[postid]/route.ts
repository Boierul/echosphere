import {NextRequest, NextResponse} from "next/server";
import {deleteSinglePostFromDB, findPostToDeleteFromDB, getSinglePostFromDB} from "@/prisma/CRUD";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

/* GET - get a single post from the DB */
export async function GET(req: NextRequest, res: NextResponse) {
    try {
        // Docs: https://nextjs.org/docs/app/api-reference/functions/next-request#nexturl

        // Given a request to /home?name=lee, searchParams is { 'name': 'lee' }
        // https://nextjs.org/docs/app/api-reference/functions/next-request#nexturl
        // const searchParams = req.nextUrl.searchParams;
        // const postId = searchParams.get('id');

        const postId = req.nextUrl.pathname.split('/').pop();

        const post = await getSinglePostFromDB(postId as string);

        if (!post) {
            return NextResponse.json(
                {message: "Post not found"},
                {status: 404}
            )
        }

        console.log(`\x1b[32m  [GET METHOD] - \x1b[33m api/v1/post/:id - \x1b[0m Fetch a post - \x1b[36m${postId}`);

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

/* DELETE - delete a single post from the DB */
export async function DELETE(req: NextRequest, res: NextResponse) {
    const session = await getServerSession(authOptions);

    // Require AUTH in order to delete post
    if (!session) {
        return NextResponse.json(
            {message: `Please sign in to delete a post.`},
            {status: 401}
        )
    }

    try {
        const postId = req.nextUrl.pathname.split('/').pop();

        const post = await findPostToDeleteFromDB(postId as string);

        if (!post) {
            return NextResponse.json(
                {message: "Post not found"},
                {status: 404}
            )
        }

        if (session.user.id !== post.userId) {
            return NextResponse.json(
                {message: "Can't delete other users posts"},
                {status: 403}
            )
        }

        console.log(`\x1b[31m  [DELETE METHOD] - \x1b[33m api/v1/post/:id - \x1b[0m Delete a post - \x1b[36m${postId}`);

        await deleteSinglePostFromDB(post.id);

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