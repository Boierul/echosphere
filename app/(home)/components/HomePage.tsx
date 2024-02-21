"use client"

import Link from "next/link";
import {useTheme} from "next-themes";
import Spacer from "@/components/Spacer";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

import TechnologiesCardsV2 from "@/app/(home)/components/TechnologiesCardsV2";
import {StarRatingInterface} from "@/types"
    ;
import TechnologiesCards from "@/app/(home)/legacy/TechnologiesCards";
import {GitHubLogoIcon} from "@radix-ui/react-icons";

export default function HomePage({numStars}: StarRatingInterface) {
    const {theme, setTheme} = useTheme();

    return (
        <div>
            <div className="container mx-auto py-4 max-w-8xl">
                <div className="my-0 flex flex-col justify-center mt-4 space-y-4 text-center mb-4 md:my-56 sm:my-24">
                    <p>Minimalistic. Simple. Perfect.</p>

                    <h1 className="font-bold text-4xl sm:text-7xl">
                        {/*Welcome{user && `, ${user.name}`}!*/}
                        Echosphere
                    </h1>

                    <div className="pt-8 flex flex-wrap space-x-4 justify-center items-center gap-4">
                        <Button
                            className="font-medium shadow-lg"
                            onClick={() =>
                                window.open("https://github.com/Boierul/echosphere")
                            }
                        >
                            Source Code
                        </Button>

                        <div className="flex justify-center items-center gap-3">

                            <div className="flex flex-col justify-start items-center">
                                <h1 className="font-bold text-base flex flex-row items-center gap-1">
                                    <GitHubLogoIcon/>
                                    Dan Pintea
                                </h1>
                                <Link
                                    className="select-all text-xs text-stone-400 hover:text-stone-500 dark:hover:text-stone-300 text-stone-400"
                                    href="https://github.com/boierul"
                                    style={{
                                        marginTop: "-0.25rem"
                                    }}
                                >
                                    github.com/boierul
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/*<div>*/}
                {/*    <p className="mb-2 flex items-center justify-center text-xl font-bold sm:text-4xl mb-8">Features</p>*/}
                {/*    <TechnologiesCardsV2/>*/}
                {/*</div>*/}

                <div>
                    <p className="text-xl mt-8 font-bold sm:text-4xl mt-0">Features</p>
                    <TechnologiesCards/>
                    <Spacer/>
                </div>


            </div>
        </div>
    )
}