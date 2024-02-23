import {NextRequest, NextResponse} from "next/server";
import Stripe from "stripe"

export async function POST(request:NextRequest) {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

        // Get the request body
        const {priceId, email} = JSON.parse(await request.text());
        // let data = await request.json();
        // let priceId = data.priceId

        // Get headers
        // const headers = request.headers.get('stripe-signature');
        // console.log(headers)

        const session = await stripe.checkout.sessions.create({
            line_items: [{
                price: priceId,
                quantity: 1
            }],
            mode: 'payment',
            success_url: `${process.env.BASE_URL}/subscribe/success`,
            cancel_url: `${process.env.BASE_URL}/subscribe/failure`,
            customer_email: email,
        })

        console.log(`\x1b[34m  [POST METHOD] - \x1b[33m api/v1/stripe/payment - \x1b[0m Create a Stripe payment`);

        // TODO: Add a webhook with certain events like: invoice_paid and such
        // But I am too lazy to do that :> so it will be simulated

        return NextResponse.json({
            // sessionId: session.id,
            url: session.url,
            // successUrl: session.success_url,
            // cancelUrl: session.cancel_url
        });
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