"use client"

import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";

export default function Failure() {
    const router = useRouter();
    const {data: session} = useSession();

    return (
        <div className="min-h-screen min-w-full flex justify-center items-center px-8 py-8">
            {session ?
                <Card
                    className="py-8 w-full max-w-lg flex-col justify-center items-center border-red-500 dark:border-red-700">
                    <CardHeader>
                        <CardTitle className="text-2xl sm:text-4xl">
                            Payment failed
                        </CardTitle>
                        <CardDescription>
                            Unfortunately, no awesome badge.
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-4">
                        <Button className="w-full" onClick={() => router.push("/subscribe")}>Try again</Button>
                    </CardFooter>
                </Card>
                :
                <Card
                    className="py-8 w-full max-w-lg flex-col justify-center items-center">
                    <CardHeader>
                        <CardTitle className="text-2xl sm:text-4xl">
                            Please log in.
                        </CardTitle>
                        <CardDescription>
                            In order to do this operation the user must be logged in.
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-4">
                        <Button className="w-full" onClick={() => router.push("/login")}>Login</Button>
                    </CardFooter>
                </Card>
            }
        </div>)
}