import prisma from "@/lib/prisma";

export async function getUser(email: string | undefined | null) {
    const [user] = await Promise.all([prisma.user.findUnique({
        where: {email: email as string},
    })]);

    return user;
}

export async function updateSubscriptionStatus(email: string, status: string) {
    const [updatedUser] = await Promise.all([prisma.user.update({
        where: {
            email: email as string,
        },
        data: {
            // subscriptionId: "pro",
            // stripeCustomerId: "customer",
            subscriptionStatus: status,
        },
    })]);
    return updatedUser;
}