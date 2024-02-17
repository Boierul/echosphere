export async function createPost(content:string) {
    const [post] = await Promise.all([fetch(`/api/v1/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({content}),
        cache: 'no-cache'
    })]);
    return post;
}