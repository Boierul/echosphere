import process from "process";

export async function deletePost(postId:string) {
    const [post] = await Promise.all([fetch(`/api/v1/post/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        // body: JSON.stringify({postId}),
        cache: 'no-cache'
    })]);
    return post;
}