"use client"

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";

import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

import {updateUserSubscriptionPlan} from "@/requests";

export default function Failure() {
    const router = useRouter();
    const {data: session} = useSession();
    const {user} = session || {};

    // Update Subscription for the user
    // Not the most efficient, but it works
    useEffect(() => {
        if (!session) {
            return;
        }

        async function updateStatus() {
            try {
                if (user?.email) {
                    const userStatus = await updateUserSubscriptionPlan(user.email as string);
                    console.log(userStatus)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        updateStatus();
    }, [user]);

    return (
        <div className="min-h-screen min-w-full flex justify-center items-center px-8 py-8">
            {session ?
                <Card
                    className="py-8 w-full max-w-lg flex-col justify-center items-center border-green-500 dark:border-green-700">
                    <CardHeader>
                        <CardTitle className="text-2xl sm:text-4xl">
                            Payment successful
                        </CardTitle>
                        <CardDescription>
                            Now you are an official owner of that awesome badge.
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-4">
                        <Button className="w-full" onClick={() => router.push("/feed")}>Check your badge</Button>
                    </CardFooter>
                </Card>
                :
                <div>
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
                </div>
            }
        </div>)
}