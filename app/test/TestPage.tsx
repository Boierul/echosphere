"use client"

import * as React from "react";

export default function TestPage() {
    const VideoPath = "video/EchosphereDemo.mp4";
    const PosterImage = "images/EchospherePoster.png";
    return (
        <div>
            Test

                <video
                    className="rounded-md border-2 border-neutral-200 dark:border-neutral-800 aspect-video"
                    poster={PosterImage}
                    controlsList="nodownload"
                    controls
                >
                    <source src={VideoPath}/>
                </video>
        </div>
    )
}