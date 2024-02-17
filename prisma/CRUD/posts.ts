import prisma from "@/lib/prisma";

export async function getAllPostsFromDB() {
    const [posts] = await Promise.all([prisma.post.findMany({
        include: {
            user: true,
            likes: true,
            comments: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    })]);

    return posts;
}

export async function getSinglePostFromDB(id: string) {
    const [post] = await Promise.all([prisma.post.findUnique({
        where: {
            id: id,
        },
        include: {
            user: true,
            likes: true,
            comments: {
                orderBy: {
                    createdAt: "asc",
                },
                include: {
                    user: true,
                },
            },
        },
    })]);

    return post;
}

export async function postSinglePostToDB(content: string, userId: string) {
    const [post] = await Promise.all([prisma.post.create({
        data: {
            content,
            userId,
        },
    })]);

    return post;
}

export async function findPostToDeleteFromDB(postId:string) {
    const [postToDelete] = await Promise.all([prisma.post.findUnique({
        where: {id: postId as string},
        select: {id:true, userId: true},
    })]);

    return postToDelete;
}

export async function deleteSinglePostFromDB(postId: string) {
    await prisma.post.delete({
        where: {
            id: postId as string,
        },
    });
}

