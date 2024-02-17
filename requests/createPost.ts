export const createPost = async (content: string) => (
    await fetch(`/api/v1/posts`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({content}),
        })
);