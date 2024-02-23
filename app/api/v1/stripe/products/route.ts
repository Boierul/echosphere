import {NextRequest, NextResponse} from "next/server";
import Stripe from "stripe"

export async function GET(request:NextRequest) {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
        const prices = await stripe.prices.list();

        console.log(`\x1b[32m  [GET METHOD] - \x1b[33m api/v1/stripe/products - \x1b[0m Get all Stripe products`);

        return NextResponse.json(prices.data);
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