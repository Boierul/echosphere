import Link from "next/link";
import ThemeToggle from "@/app/components/ThemeToggle";
import {Button} from "@/components/ui/button";
import {useSelectedLayoutSegment} from "next/navigation";

export default function NavigationBar() {
    // Change style for the tabs dynamically
    const segment = useSelectedLayoutSegment();

    return (
        <header className="bg-background sticky top-0 z-40 w-full border-b border-zinc-100 dark:border-zinc-900">
            <div className="container flex h-14 items-center space-x-4 sm:justify-between sm:space-x-0">
                <h1 className="font-bold">
                    Echosphere
                </h1>

                <div className="flex items-center justify-row pl-6 gap-4 text-sm">
                    <Link
                        href="/"
                        rel="noreferrer"
                    >
                            <span>Home</span>
                    </Link>
                    <Link
                        href="/"
                        target="_blank"
                        rel="noreferrer"
                    >
                            <span>Feed</span>
                    </Link>
                    <Link
                        href="/"
                        rel="noreferrer"
                    >
                        <span>Subscribe</span>
                    </Link>
                </div>

                <div className="flex flex-1 items-center justify-end space-x-4">
                    <nav className="flex items-center space-x-1">
                        <ThemeToggle/>
                        <Button variant="ghost">
                            Sign out
                        </Button>
                    </nav>
                </div>
            </div>
        </header>
    )
}