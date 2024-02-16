export async function askChatGPTForSuggestion(content : string) {
    const [sugestion] = await Promise.all([fetch("/api/v1/suggestion", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            prompt: content,
        }),
    })]);

    return sugestion;
}