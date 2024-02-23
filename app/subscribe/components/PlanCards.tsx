"use client"

import * as React from "react";
import {useEffect, useState} from "react";

import VanillaTilt from "vanilla-tilt";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {CheckIcon, InfoCircledIcon} from "@radix-ui/react-icons";
import {Badge} from "@/components/ui/badge";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";

import {useMediaQuery} from "@/hooks/useMediaQuery";
import {getStripePayment, getStripeProducts} from "@/requests";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";

export default function PlanCards() {
    /* ------------------------------------------------------------------------------------------------------------ */
    // Next-Auth data

    const {data: session} = useSession();
    const [isNotLogged, setIsNotLogged] = useState(true);

    // TextArea disabled only takes booleans
    useEffect(() => {
        if (session) {
            setIsNotLogged(false)
        } else {
            setIsNotLogged(true)
        }
        console.log(isNotLogged)
    }, [session]);

    /* ------------------------------------------------------------------------------------------------------------ */

    // Check the window size for additional styling
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const router = useRouter();
    // State of the Stripe Products
    const [stripeProducts, setStripeProducts] = useState<any[]>([]);

    // Fetch Stripe products
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await getStripeProducts();
                setStripeProducts(res)
                return res;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);


    // Enable tilts for the cards
    useEffect(() => {
        if (isDesktop) {
            // @ts-ignore
            VanillaTilt.init(document.querySelectorAll('#card, #card-button'), {
                max: 12.5,
                speed: 300,
                glare: true,
                "max-glare": 0.25,
                "scale": 1.1,
                reverse: true,
                perspective: 1000,
                gyroscope: true
            });
        }
    }, [isDesktop]);

    async function handlePayment() {
        const res = await getStripePayment(stripeProducts[0].id, session?.user?.email);
        const data = await res.json();

        if (res.ok) {
            router.push(data.url)
        }
    }

    return (
        <div className="flex flex-col md:flex-row">
            <div className="container flex justify-center items-center flex-wrap gap-10">
                <Card id="card" className="h-[28rem] px-4 py-8 rounded-md">
                    <CardHeader className="flex items-start w-[17rem]">
                        <h1 className="font-bold text-4xl">
                            Starter Plan
                        </h1>
                    </CardHeader>
                    <CardContent className="px-6">
                        <div className="mt-0">
                            <h1 className="text-2xl font-bold">Free</h1>
                            <p className="text-xs">Free for everyone. Forever.</p>
                        </div>

                        <div className="py-6">
                            <Button id="card-button" variant="secondary" className="text-sm w-full"
                                    disabled={true}>
                                {isNotLogged ? "Log in first." : "Owned"}
                            </Button>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-2">
                                <CheckIcon/>
                                <p className="text-xs">Unlimited posts</p>
                            </div>
                            <div className="flex flex-row gap-2">
                                <CheckIcon/>
                                <p className="text-xs">Unlimited comments</p>
                            </div>
                            <div className="flex flex-row gap-2">
                                <CheckIcon/>
                                <p className="text-xs">Community access</p>
                            </div>
                            <div className="flex flex-row gap-2">
                                <CheckIcon/>
                                <p className="text-xs">No badge</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card id="card" className="h-[28rem] px-4 py-8 rounded-md border-black dark:border-white">
                    <CardHeader className="flex flex-row items-start w-[17rem] gap-4 items-center">
                        <h1 className="font-bold text-4xl">
                            Pro Plan
                        </h1>
                        <Badge className="rounded-full">
                            Pro
                        </Badge>
                    </CardHeader>
                    <CardContent className="px-6">
                        <div className="mt-0">
                            <div className="flex flex-row items-center">
                                <h1 className="text-2xl font-bold">$2.99</h1>
                                <p className="pl-[2px] text-stone-500">/forever</p>
                            </div>
                            <p className="text-xs">One time purchase. Just once.</p>
                        </div>

                        <div className="py-6">
                            <Button id="card-button" variant="default" className="text-sm w-full"
                                    disabled={isNotLogged} onClick={() => handlePayment()}>
                                {isNotLogged ? "Log in first." : "Get Started"}
                            </Button>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-2">
                                <CheckIcon/>
                                <p className="text-xs">Unlimited posts</p>
                            </div>
                            <div className="flex flex-row gap-2">
                                <CheckIcon/>
                                <p className="text-xs">Unlimited comments</p>
                            </div>
                            <div className="flex flex-row gap-2">
                                <CheckIcon/>
                                <p className="text-xs">Community access</p>
                            </div>
                            <div className="flex flex-row gap-2">
                                <CheckIcon/>
                                <p className="text-xs">Awesome badge</p>
                            </div>
                            <div className="flex flex-row gap-2">
                                <CheckIcon/>
                                <p className="text-xs">Community recognition</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="hidden lg:block">
                <HoverCard>
                    <HoverCardTrigger asChild className="cursor-pointer">
                        <InfoCircledIcon/>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-72">
                        <div className="flex justify-between space-x-4">
                            <div>
                                <h4 className="text-md font-semibold mb-2">No need for real money.</h4>
                                <p className="text-xs">
                                    Use card <span className="font-bold">4242 4242 4242 4242</span>.
                                </p>
                                <p className="text-xs">
                                    Random numbers for mm/yy and CVC.
                                </p>
                            </div>
                        </div>
                    </HoverCardContent>
                </HoverCard>
            </div>
        </div>
    )
}