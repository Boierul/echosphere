import HomePage from "@/app/(home)/components/HomePage";

async function getStars() {
    const res: Response = await fetch(
        "https://api.github.com/repos/Boierul/openai_chat_webapp",
        { next: { revalidate: 60 } }
    );
    const data = await res.json();
    return data.stargazers_count;
}

export default async function Home() {
    const githubStars = await getStars();
    return (
        <main>
            <HomePage/>
        </main>
    )
}