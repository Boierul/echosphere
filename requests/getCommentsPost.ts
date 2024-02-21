export async function getCommentsPost(postId: string) {
    const [allComments] = await Promise.all([fetch("/api/v1/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            postId: postId,
        }),
    })]);
    return allComments;
}