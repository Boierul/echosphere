import process from "process";

export async function updateUserSubscriptionPlan(email:string) {
    const [user] = await Promise.all([fetch(`/api/v1/user`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email: email}),
        cache: 'force-cache'
    })]);
    return user.json();
}