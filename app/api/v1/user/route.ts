import {NextRequest, NextResponse} from "next/server";
import {updateSubscriptionStatus} from "@/prisma/CRUD";

/* PATCH - Update user subscription */
export async function PATCH(request: NextRequest) {
    try {
        // Get the request body
        const {email} = JSON.parse(await request.text());
        // Hard-coded value
        const status = "active";

        const data = await updateSubscriptionStatus(email, status);
        console.log("\x1b[35m  [PATCH METHOD] - \x1b[33m api/v1/user - \x1b[0m Update user status");

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