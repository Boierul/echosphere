export async function toggleLikePost(id:string) {
    const [likePost] = await Promise.all([fetch("/api/v1/like", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            postId: id,
        }),
    })]);
    return likePost;
}