import {NextRequest, NextResponse} from "next/server";
import {getAllProUsers} from "@/prisma/CRUD";
import {unstable_noStore as noStore} from 'next/cache';

/* GET - get all pro users  */
export async function GET(req: NextRequest, res: NextResponse) {
    noStore();

    try {
        const proUsers = await getAllProUsers();

        if (!proUsers) {
            return NextResponse.json(
                {message: "Users not found"},
                {status: 404}
            )
        }

        console.log(`\x1b[32m  [GET METHOD] - \x1b[33m api/v1/users - \x1b[0m Get all pro users`);

        return NextResponse.json(proUsers)
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