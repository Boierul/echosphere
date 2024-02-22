"use client"

import * as React from "react";
import {useEffect, useState} from "react";

import Link from "next/link";
import {useTheme} from "next-themes";
import Spacer from "@/components/Spacer";
import {Button} from "@/components/ui/button";
import {GitHubLogoIcon} from "@radix-ui/react-icons";

import {StarRatingInterface} from "@/types";
import TechnologiesCards from "@/app/(home)/legacy/TechnologiesCards";

export default function HomePage({numStars}: StarRatingInterface) {
    const {theme, setTheme} = useTheme();

    const videoPath = "video/EchosphereDemo.mp4";
    const [posterImage, setPosterImage] = useState("");

    // Array of screenshot paths
    const screenshotPaths = [
        "images/Echosphere1.png",
        "images/Echosphere2.png",
        "images/Echosphere3.png",
        "images/Echosphere4.png",
    ];

    // Dynamically update the poster image for the video
    useEffect(() => {
        const lightPoster = "images/EchospherePoster.png";
        const darkPoster = "images/EchospherePosterDark.png";
        setPosterImage(theme === "light" ? lightPoster : darkPoster);
    }, [theme]);

    function handleImage() {

    }

    return (
        <div>
            <div className="container mx-auto max-w-8xl">
                <div className="block md:hidden">
                    <div className="h-20"/>
                </div>
                <div className="h-full flex flex-col justify-center space-y-4 text-center mb-4 md:h-screen">
                    <p>Minimalistic. Simple. Perfect.</p>

                    <h1 className="font-bold text-4xl sm:text-7xl">
                        {/*Welcome{user && `, ${user.name}`}!*/}
                        Echosphere
                    </h1>

                    <div className="pt-2 flex flex-wrap space-x-4 justify-center items-center gap-4 sm:pt-8">
                        <Button
                            className="font-medium shadow-lg"
                            onClick={() =>
                                window.open("https://github.com/Boierul/echosphere")
                            }
                        >
                            Source Code
                        </Button>

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

                <Spacer/>

                <div className="flex justify-center flex-col h-full">
                    <p className="text-xl mt-2 font-bold sm:text-4xl mt-0">Demo</p>

                    <video
                        className="mt-4 rounded-md border-2 border-neutral-200 dark:border-neutral-800 aspect-video"
                        poster={posterImage}
                        controlsList="nodownload"
                        controls
                    >
                        <source src={videoPath} className="rounded-md"/>
                    </video>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 justify-center items-center md:mt-8">
                        {screenshotPaths.map((path, index) => (
                            <img
                                key={index}
                                className="w-full h-auto rounded-md border-2 border-neutral-200 dark:border-neutral-800"
                                src={path}
                                onClick={handleImage}
                                alt={`EchosphereImage${index}`}
                            />
                        ))}
                    </div>
                </div>

                <Spacer/>

                <div className="flex justify-center flex-col h-full">
                    <p className="text-xl mt-2 font-bold sm:text-4xl mt-0">Features</p>
                    <TechnologiesCards/>
                    <Spacer/>
                </div>


            </div>
        </div>
    )
}

{/*<div>*/}
{/*    <p className="mb-2 flex items-center justify-center text-xl font-bold sm:text-4xl mb-8">Features</p>*/}
{/*    <TechnologiesCardsV2/>*/}
{/*</div>*/}