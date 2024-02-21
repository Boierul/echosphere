import prisma from "@/lib/prisma";

export async function addComment(content:string, postId:string, prismaUserId:string|undefined) {
    const [comment] = await Promise.all([prisma.comment.create({
        data: {
            content: content as string,
            postId: postId as string,
            userId: prismaUserId as string,
        },
    })]);
    return comment;
}

export async function getAllPostComments(postId: string) {
    const [comments] = await Promise.all([prisma.comment.findMany({
        where: {
            postId: postId
        },
        include: {
            user: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    })]);
    return comments;
}