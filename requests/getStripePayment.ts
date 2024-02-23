export async function getStripePayment(priceId: string, email: string | null | undefined) {
    const [payment] = await Promise.all([fetch(`/api/v1/stripe/payment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({priceId, email}),
        cache: 'no-cache'
    })]);

    return payment;
}