import prisma from "@/lib/prisma";

export async function postAlreadyLiked(postId: string|undefined, prismaUserId:string) {
    const [alreadyLiked] = await Promise.all([prisma.like.findFirst({
        where: {
            postId: postId,
            userId: prismaUserId,
        },
    })]);
    return alreadyLiked;
}

export async function likePost(postId: string | undefined, prismaUserId: string) {
    const [likePost] = await Promise.all([prisma.like.create({
        data: {
            postId: postId as string,
            userId: prismaUserId as string,
        },
    })]);
    return likePost;
}

export async function unlikePost(alreadyLikedId:string) {
    const [unlikePost] = await Promise.all([prisma.like.delete({
        where: {
            id: alreadyLikedId,
        },
    })]);
    return unlikePost;
}