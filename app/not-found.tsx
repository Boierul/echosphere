import Link from "next/link"
import {Button} from "@/components/ui/button";

export default function NotFound() {
    return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-black">
                <h1 className="text-8xl font-bold text-gray-900 dark:text-gray-100">404</h1>
                <p className="mt-2 text-xl text-gray-600 dark:text-gray-400">Page does not exist</p>
                {/*<p className="mt-20 text-2xl text-gray-500 dark:text-gray-400 animate-bounce-slow">¯\_(ツ)_/¯</p>*/}
                {/*<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">The page you are looking for does not exist.</p>*/}
                <Button variant="default" className="mt-12 font-normal" >
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