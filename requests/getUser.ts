import prisma from "@/lib/prisma";

export async function getUser(email: string | undefined) {
    const [user] = await Promise.all([prisma.user.findUnique({
        where: {email: email as string},
    })]);

    return user;
}