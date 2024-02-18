import React from "react";

export default function LoaderInverted() {
    return (
        <div className="flex justify-center gap-[6px]">
            <div className="w-1 h-1 rounded-full bg-gray-50 animate-ping-slow animation-delay-400 dark:bg-gray-950"/>
            <div className="w-1 h-1 rounded-full bg-gray-50 animate-ping-slower animation-delay-200 dark:bg-gray-950"/>
            <div className="w-1 h-1 rounded-full bg-gray-50 animate-ping-slowest animation-delay-0 dark:bg-gray-950"/>
        </div>
    )
}