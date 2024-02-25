"use client"

import {signIn, useSession} from "next-auth/react";
import {AuthProvidersInterface} from "@/types";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {GitHubLogoIcon} from "@radix-ui/react-icons";
import {useTheme} from "next-themes";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function LoginPage({providers}: AuthProvidersInterface) {
    const {theme, setTheme} = useTheme();
    const {data: session} = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session) {
            router.push("/feed")
        }
    }, [session]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50 dark:bg-neutral-900">
            <Card className="mx-8 w-full max-w-[360px] p-8 sm:max-w-xl">
                <CardHeader className="flex flex-col items-center space-y-2">
                    <h2 className="text-5xl font-bold">Login</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 sm:text-base">
                        Choose your preferred provider to log in
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="mt-0 flex w-full flex-col justify-center items-center gap-3 sm:flex-row mt-4">
                        {providers &&
                            Object.values(providers).map(provider => (
                                <div key={provider.name}>
                                    <Button onClick={() => signIn(provider.id)} className="min-w-52">
                                        {provider.name === "GitHub" ?
                                            <GitHubLogoIcon/>
                                            :
                                            <>
                                                <svg width="18px" height="18px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" >
                                                    <path fill={theme === "dark" ? "#100F13" : "#FFFFFF"}
                                                          d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm167 633.6C638.4 735 583 757 516.9 757c-95.7 0-178.5-54.9-218.8-134.9C281.5 589 272 551.6 272 512s9.5-77 26.1-110.1c40.3-80.1 123.1-135 218.8-135 66 0 121.4 24.3 163.9 63.8L610.6 401c-25.4-24.3-57.7-36.6-93.6-36.6-63.8 0-117.8 43.1-137.1 101-4.9 14.7-7.7 30.4-7.7 46.6s2.8 31.9 7.7 46.6c19.3 57.9 73.3 101 137 101 33 0 61-8.7 82.9-23.4 26-17.4 43.2-43.3 48.9-74H516.9v-94.8h230.7c2.9 16.1 4.4 32.8 4.4 50.1 0 74.7-26.7 137.4-73 180.1z"/>
                                                </svg>
                                            </>}
                                        <div className="ml-2">
                                            Sign in with{' '} {provider.name}
                                        </div>
                                    </Button>
                                </div>
                            ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}