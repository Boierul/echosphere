import Link from "next/link"
import {Button} from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-8xl font-bold text-gray-900 dark:text-gray-100">404</h1>
            <p className="mt-2 text-xl text-gray-600 dark:text-gray-400">Page does not exist</p>
            <Button variant="default" className="mt-12 font-normal w-48">
                <Link
                    href="/"
                    rel="noreferrer"
                >
                    Homepage
                </Link>
            </Button>
        </div>
    )
}