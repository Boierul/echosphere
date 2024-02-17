import {NextRequest, NextResponse} from "next/server";
import {getUser} from "@/requests";
import {postSinglePostToDB} from "@/prisma/CRUD";

/* POST - add a posts to the DB */
export async function POST(req: NextRequest, res: NextResponse) {
    const {content} = JSON.parse(await req.text());

    // TODO: Change it to the session user with auth
    // Get user from the DB
    const prismaUser = await getUser("email@email.com");

    // Create posts
    try {
        const post = await postSinglePostToDB(content as string, prismaUser?.id as string)
        console.log('\x1b[34m  [POST METHOD] - \x1b[33mPOSTS ROUTE - api/v1/posts');

        return NextResponse.json(post)
    } catch (error) {
        // TODO: Refactor status codes for more appropriate ones
        NextResponse.json(
            {message: `Internal server error: ${error}`},
            {status: 500}
        )
    }
}

// /* GET - get all posts from the DB */
// export async function GET() {
//
// }