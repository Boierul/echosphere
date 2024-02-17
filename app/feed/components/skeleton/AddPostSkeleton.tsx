import React from "react";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";

export default function AddPostSkeleton() {
    return (
        <>
            <div className="grid w-full gap-1.5 mb-4 pt-4 animate-pulse">
                <div>
                    <Label className="animate-pulse text-sm text-stone-600">
                        Loading component
                    </Label>
                    <Textarea
                        placeholder=""
                        className="resize-none h-28 rounded-lg mb-4"
                    />
                </div>
            </div>

            <div className="flex-wrap flex items-center w-full justify-between gap-3">
                <Button
                    className="animate-pulse font-medium flex-1"
                    variant="secondary"
                    style={{minWidth: "10rem"}}
                />
                <Button
                    style={{minWidth: "10rem"}}
                    className="animate-pulse font-medium flex-1"
                    variant="secondary"
                />
            </div>
        </>
    )
}