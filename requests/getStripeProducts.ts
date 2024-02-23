import process from "process";

export async function getStripeProducts() {
    const [products] = await Promise.all([fetch(`/api/v1/stripe/products`, { cache: 'force-cache' })]);
    return products.json();
}
