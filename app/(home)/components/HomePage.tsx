"use client"

import * as React from "react";
import {useEffect, useState} from "react";

import Link from "next/link";
import {useTheme} from "next-themes";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContentWithoutCloseButton, DialogTrigger} from "@/components/ui/dialog";
import {GitHubLogoIcon} from "@radix-ui/react-icons";

import Spacer from "@/components/Spacer";
import TechnologiesCards from "@/app/(home)/components/TechnologiesCards";

export default function HomePage() {
    const {theme, setTheme} = useTheme();

    const videoPath = "video/EchosphereDemo.mp4";
    const [posterImage, setPosterImage] = useState("");

    // Dialog Modal for opening an image
    const [openImage, setOpenImage] = React.useState(false)
    // Open specific image
    const [imagePath, setImagePath] = React.useState("")

    // Array of screenshot paths
    const screenshotPaths = [
        "images/Echosphere1.png",
        "images/Echosphere2.png",
        "images/Echosphere3.png",
        "images/Echosphere4.png",
    ];

    // Scroll to the top of the page each time page is accessed
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Dynamically update the poster image for the video
    useEffect(() => {
        const lightPoster = "images/EchospherePoster.png";
        const darkPoster = "images/EchospherePosterDark.png";
        setPosterImage(theme === "light" ? lightPoster : darkPoster);
    }, [theme]);

    function handleImage(index: number) {
        setImagePath(screenshotPaths[index])
    }

    // TODO: Push the components.json and components folder as well as
    //  I have written custom components that shadcnui does not have
    return (
        <div className="container mx-auto max-w-8xl">
            <div className="block md:hidden">
                <div className="h-20"/>
            </div>

            <div className="mt-6 h-full flex flex-col justify-center space-y-[2px] text-center mb-4 md:h-screen md:mt-0 space-y-4">
                <p>Minimalistic. Simple. Perfect.</p>

                <h1 className="font-bold text-4xl sm:text-7xl">
                    Echosphere.
                </h1>

                <div className="pt-8 flex flex-wrap space-x-0 justify-center items-center gap-0 sm:pt-8 space-x-4 sm:gap-3">
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

            <div className="block md:hidden">
                <div className="h-4"/>
            </div>

            <div className="flex justify-center flex-col h-full">
                <p className="text-xl mt-2 font-bold sm:text-4xl mt-0">Overview</p>

                <video
                    className="mt-4 rounded-md border-2 border-neutral-200 dark:border-neutral-800 aspect-video"
                    poster={posterImage}
                    controlsList="nodownload"
                    controls
                >
                    <source src={videoPath} className="rounded-md"/>
                </video>

                <Dialog open={openImage} onOpenChange={setOpenImage}>
                    <DialogTrigger asChild>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 justify-center items-center md:mt-8">
                            {screenshotPaths.map((path, index) => (
                                <img
                                    key={index}
                                    className="w-full h-auto rounded-md border-2 border-neutral-200 dark:border-neutral-800"
                                    alt={`EchosphereImage${index}`}
                                    src={path}
                                    onClick={() => handleImage(index)}
                                />
                            ))}
                        </div>
                    </DialogTrigger>
                    <DialogContentWithoutCloseButton className="max-w-[1340px] h-auto p-0">
                        <img
                            className="w-full h-auto rounded-md"
                            src={imagePath}
                            alt={`EchosphereImage`}
                        />
                    </DialogContentWithoutCloseButton>
                </Dialog>
            </div>

            <Spacer/>

            <div className="flex justify-center flex-col h-full">
                <p className="text-xl mt-2 font-bold sm:text-4xl mt-0">Features</p>
                <TechnologiesCards/>
                <Spacer/>
            </div>
        </div>
    )
}