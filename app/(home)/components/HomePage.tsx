"use client"

import Spacer from "@/components/Spacer";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import TechnologiesCards from "@/app/(home)/components/TechnologiesCards";

export default function HomePage() {
    return (
        <div>
            <div className="container mx-auto py-4 max-w-8xl">
                <div className="mt-4 space-y-4 text-center">
                    <h1
                        className="pb-2 font-bold text-7xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                    >
                        {/*Welcome{user && `, ${user.name}`}!*/}
                        Welcome!
                    </h1>
                    <h2 className="text-2xl font-light">
                        Where Every Voice Shapes Tomorrow
                    </h2>
                </div>

                <div className="pt-4 flex flex-wrap space-x-4 justify-center">
                    <Button
                        className="font-medium bg-gradient-to-r from-pink-500 to-yellow-600 text-white shadow-lg"
                        onClick={() =>
                            window.open("https://github.com/Boierul/echosphere")
                        }
                    >
                        Source Code on GitHub
                    </Button>

                    <Link href="https://github.com/boierul">
                        <p className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-pink-500 pr-2">
                            {/*{numStars} stars on GitHub*/}
                            0 stars on GitHub
                        </p>
                    </Link>
                </div>

                <div className="mt-4 flex justify-center gap-3">
                    <Avatar className="w-12 h-12 border-2 border-green-400">
                        <AvatarImage src="https://avatars.githubusercontent.com/u/49337867?v=4" alt="@boierul"/>
                        <AvatarFallback>DP</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col flex-wrap justify-center">
                        <h1 className="font-bold text-base">
                            Dan Pintea
                        </h1>
                        <Link
                            className="text-sm text-stone-400 hover:text-stone-500 dark:hover:text-stone-300 text-stone-400"
                            href="https://github.com/boierul"
                            style={{
                                marginTop: "-0.25rem"
                            }}
                        >
                            github.com/boierul
                        </Link>
                    </div>
                </div>

                <div className="mb-8">
                    <p className="text-3xl font-medium">Features</p>

                    <TechnologiesCards/>
                </div>

            </div>
        </div>
    )
}