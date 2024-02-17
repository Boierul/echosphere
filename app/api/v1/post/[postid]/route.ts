import {NextRequest, NextResponse} from "next/server";
import {deleteSinglePostFromDB, findPostToDeleteFromDB, getSinglePostFromDB} from "@/prisma/CRUD";
import {usePathname} from "next/navigation";

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

        console.log("\x1b[34m  [GET METHOD] - \x1b[33mPOSTS ROUTE - api/v1/post/:id");

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

/* DELETE - delete a single post from the DB */
export async function DELETE(req: NextRequest, res: NextResponse) {
    // TODO: Change it to the session user with auth
    try {
        const postId = req.nextUrl.pathname.split('/').pop();

        const post = await findPostToDeleteFromDB(postId as string);

        if (!post) {
            return NextResponse.json(
                {message: "Post not found"},
                {status: 404}
            )
        }

        console.log('\x1b[34m  [DELETE METHOD] - \x1b[33mPOST ROUTE - api/v1/post/:id');

        await deleteSinglePostFromDB(post.id);

        return NextResponse.json(post)
    } catch (error) {
        // TODO: Refactor status codes for more appropriate ones
        NextResponse.json(
            {message: `Internal server error: ${error}`},
            {status: 500}
        )
    }
}