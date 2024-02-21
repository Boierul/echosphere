export async function createComment(content: string, postId: string) {
    const [comment] = await Promise.all([fetch("/api/v1/comment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            content: content,
            postId: postId,
        }),
    })]);
    return comment;
}