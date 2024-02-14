"use client"

import * as React from "react"
import Spacer from "@/components/Spacer";
import {Button} from "@/components/ui/button";
import {useTheme} from "next-themes";

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Textarea} from "@/components/ui/textarea"
import {useToast} from "@/components/ui/use-toast"
import {ToastAction} from "@/components/ui/toast";

// import {GeistMono} from 'geist/font/mono';
// import {GeistSans} from "geist/font/sans";
// import {Space_Grotesk, Inter, DM_Sans} from "next/font/google";
//
// const inter = Inter({subsets: ["latin"]});
// const spaceGrotesk = Space_Grotesk({subsets: ["latin"]});
// const dmSerifDisplay = DM_Sans({weight: "400", subsets: ["latin"]});

// <div>
//     <Spacer/>
//     <h1>Testing ground</h1>
//      <p className={`${dmSerifDisplay.className} mt-3 mb-3 text-white text-center text-opacity-80 mb-10`}>
//          App directory, routing, layouts, and API routes.
//      </p>
// </div>

export default function ModeToggle() {
    const {theme, setTheme} = useTheme();
    const {toast} = useToast()

    // Example profanity filter function
    function containsProfanity(str: string) {
        // Replace this with actual profanity checking logic
        const profanities = ['badword1', 'badword2'];
        return profanities.some((profanity) => str.includes(profanity));
    }

    // Form Schema validation
    const FormSchema = z.object({
        message: z
            .string()
            .min(5, {
                message: "Message must be at least 5 characters.",
            })
            .max(300, {
                message: "Message must not be longer than 300 characters.",
            })
            .refine(value => !containsProfanity(value), {
                message: "Your message contains profanity.",
            }),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(JSON.stringify(data))

        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(data, null, 2)}
                    </code>
                </pre>
            ),
        })
    }

    return (
        <div>
            <Spacer/>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
                    <FormField
                        control={form.control}
                        name="message"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-black dark:text-white">
                                    Share your thoughts
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Give it a try and test it out"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                {/*<FormDescription>*/}
                                {/*    You can <span>@mention</span> other users and organizations.*/}
                                {/*</FormDescription>*/}
                                <FormMessage className="min-h-2"/>
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Submit</Button>
                </form>
            </Form>

            {/*<Button*/}
            {/*    variant="outline"*/}
            {/*    onClick={() => {*/}
            {/*        toast({*/}
            {/*            duration: 1000,*/}
            {/*            title: "Uh oh! Something went wrong.",*/}
            {/*            description: "There was a problem with your request.",*/}
            {/*            action: <ToastAction altText="Try again">Try again</ToastAction>,*/}
            {/*        })*/}
            {/*    }}*/}
            {/*>*/}
            {/*    Show Toast*/}
            {/*</Button>*/}

            {/*<Label htmlFor="message">Share your thoughts</Label>*/}
            {/*<Textarea placeholder="Type your message here." id="message" className="h-24 resize-none"/>*/}

        </div>
    )
}
