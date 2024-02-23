import * as React from "react";

import PlanCards from "@/app/subscribe/components/PlanCards";

export default function Subscribe() {
    return (
        <div>
            <div className="block md:hidden">
                <div className="h-24"/>
            </div>
            <div className="flex items-center justify-center h-full w-full sm:h-screen w-screen">
                <PlanCards/>
            </div>
            <div className="block md:hidden">
                <div className="h-20"/>
            </div>
        </div>
    )
}