export async function getAllSubscribedUsers() {
    const [proUsers] = await Promise.all([fetch(`/api/v1/users`, {
        cache: 'no-cache',
        // next: {
        //     revalidate: 3600
        // }
    })]);
    return proUsers.json();
}
