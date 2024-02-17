"use client"

import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useToast} from "@/components/ui/use-toast";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {askChatGPTForSuggestion} from "@/requests";
import Loader from "@/components/Loader";
import {createPost} from "@/requests/createPost";
// import {Button, Spacer, Spinner, Textarea} from "@nextui-org/react";
// import {useSession} from "next-auth/react";

// import Filter from "bad-words";
// import {createPost} from "@/utils/requestsAPI";
// import {askChatGPTForSuggestion} from "@/utils/requests/openaiSuggestion";

// Filter profanities
// const filter = new Filter();

export default function AddPost() {
    // const {data: session} = useSession();
    const router = useRouter();
    const {toast} = useToast()

    // Add a posts content
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    // AI phrase generation temp storage
    const [enhancing, setEnhancing] = useState(false);

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Error creating posts.");


    const enhanceWithAI = async () => {
        setEnhancing(true);
        const res = await askChatGPTForSuggestion(content);
        const GPTdata = await res.json();
        setContent(GPTdata.content);
        setEnhancing(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        // e.preventDefault();
        //
        // if (loading) return;
        // setError(false);
        //
        // if (content.length < 1) {
        //     setErrorMessage("Post cannot be empty");
        //     setError(true);
        // } else if (filter.isProfane(content)) {
        //     setErrorMessage("Profanities are not allowed");
        //     setError(true);
        // } else {
        //     try {
        //         const filteredContent = filter.clean(content);
        //
        //         const res = await createPost(filteredContent);
        //
        //         if (res.ok) {
        //             setContent("");
        //             router.refresh();
        //         }
        //         setError(false);
        //         setLoading(false);
        //     } catch {
        //         setErrorMessage("Error creating posts.");
        //         setError(true);
        //     }
        // }
    }


    // Example profanity filter function
    function containsProfanity(str: string) {
        // Replace this with actual profanity checking logic
        const profanities = ['badword1', 'badword2'];
        return profanities.some((profanity) => str.includes(profanity));
    }

    // Zod Form Schema validation
    const FormSchema = z.object({
        message: z
            .string()
            .min(5, {
                message: "Message must be at least 5 characters",
            })
            .max(300, {
                message: "Message must not be longer than 300 characters",
            })
            .refine(value => !containsProfanity(value), {
                message: "Message contains profanities",
            }),
    })

    // Zod Form object
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        mode: `onChange`
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        // console.log(JSON.stringify(data))
        const res = await createPost(content);
        if (res.ok) {
            setContent("");
            router.refresh();
        }

        toast({
            title: "Post successfully submitted",
            description: "Share it with everyone again",
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid w-full gap-1.5 mb-2 pt-8">
                    <FormField
                        control={form.control}
                        name="message"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel htmlFor="message" className="text-sm text-black dark:text-white" style={{
                                    position: "absolute",
                                    marginTop: "-1rem"
                                }}>
                                    Share your thoughts
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Give it a try and test it out"
                                        className="resize-none h-28 rounded-lg"
                                        disabled={enhancing}
                                        onChangeCapture={(e) => setContent(e.currentTarget.value)}
                                        defaultValue={content}
                                        {...field}
                                    />
                                </FormControl>
                                <div id="form-error" className="mb-2 flex flex-row justify-between">
                                    <div className="">
                                        <FormMessage className="text-rose-400 dark:text-rose-600"/>
                                    </div>
                                    <p className="text-xs pt-[2px]">{(content && content.length) || "0"}/300</p>
                                </div>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex-wrap flex items-center w-full justify-between gap-3">
                    <Button
                        className="font-medium flex-1"
                        color="secondary"
                        type="submit"
                        // disabled={!session || enhancing}
                        disabled={enhancing}
                        style={{minWidth: "10rem"}}
                    >
                        {/*{loading ? <Spinner size="sm" color="white"/> : "Post"}*/}
                        Post
                    </Button>

                    <Button
                        // disabled={!session || enhancing}
                        disabled={enhancing}
                        style={{minWidth: "10rem"}}
                        onClick={enhanceWithAI}
                        className="font-medium flex-1"
                        variant="secondary"
                    >
                        {enhancing ? <Loader/> : "AI Suggestion"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}