"use client"

import * as React from "react"
import {useState} from "react"
import {Button} from "@/components/ui/button";

import Spacer from "@/components/Spacer";
import {askChatGPTForSuggestion} from "@/requests/openaiSuggestion";
import {Textarea} from "@/components/ui/textarea";

export default function Test() {
    const [content, setContent] = useState("");

    const enhanceWithAI = async () => {
        const res = await askChatGPTForSuggestion(content);
        const GPTdata = await res.json();
        setContent(GPTdata.content);
    };
    return (
        <main>
            <Spacer/>

            <div>
                <Button
                    style={{marginLeft: 10, minWidth: "150px"}}
                    onClick={enhanceWithAI}
                >
                    test
                </Button>
            </div>


            <div>
                <Textarea
                    placeholder="Give it a try and test it out"
                    className="resize-none h-24 rounded-lg"
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                />
            </div>

            <div className="flex items-center justify-center w-full min-h-screen p-4">
                <div className="absolute inset-0 z-10 flex items-center justify-center w-full p-4">
                    <div className="grid w-16 grid-cols-3 items-center justify-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-gray-950 animate-ping-slow" />
                        <div className="w-2 h-2 rounded-full bg-gray-950 animate-ping animation-delay-300" />
                        <div className="w-2 h-2 rounded-full bg-gray-950 animate-ping animation-delay-600" />
                    </div>
                </div>
            </div>


        </main>
    )
}
