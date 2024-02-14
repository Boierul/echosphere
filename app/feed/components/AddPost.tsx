"use client"

import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import Spacer from "@/components/Spacer";
import {Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {toast, useToast} from "@/components/ui/use-toast";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
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

    // Add a post content
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    // AI phrase generation temp storage
    const [enhancing, setEnhancing] = useState(false);

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Error creating post.");

    const enhanceWithAI = async () => {
        // if (enhancing) return;
        // if (content.length < 1) {
        //     setErrorMessage("Post cannot be empty");
        //     setError(true);
        //     return;
        // }
        // setEnhancing(true);
        // setError(false);
        //
        // const res = await askChatGPTForSuggestion(content);
        //
        // if (res.ok) {
        //     const GPTdata = await res.json();
        //     setContent(GPTdata.content);
        // } else {
        //     setError(true);
        // }
        //
        // setEnhancing(false);
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
        //         setErrorMessage("Error creating post.");
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

    // Form object
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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {/*<Textarea*/}
                {/*    className="mt-6 bold"*/}
                {/*    size="lg"*/}
                {/*    variant="faded"*/}
                {/*    labelPlacement="outside"*/}
                {/*    maxLength={300}*/}
                {/*    placeholder={session ? "Give it a try and test it out" : ""}*/}
                {/*    label={session ? "Share your thoughts" : "Please sign in to post."}*/}
                {/*    errorMessage={error && errorMessage}*/}
                {/*    isDisabled={!session || enhancing}*/}
                {/*    value={content}*/}
                {/*    onChange={(e) => setContent(e.target.value)}*/}
                {/*/>*/}

                <div className="grid w-full gap-1.5 mb-4 pt-8">
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
                                        className="resize-none h-24 rounded-lg"
                                        {...field}
                                    />
                                </FormControl>
                                <div id="form-error" style={{
                                    minHeight: "1.1rem",
                                    position: "absolute",
                                    marginTop: "3.75rem"
                                }}>
                                    <FormMessage className="text-rose-400 dark:text-rose-600"/>
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
                        // isDisabled={!session || enhancing}
                        style={{minWidth: "10rem"}}
                    >
                        {/*{loading ? <Spinner size="sm" color="white"/> : "Post"}*/}
                        Post
                    </Button>

                    <Button
                        // isDisabled={!session || enhancing}
                        style={{minWidth: "10rem"}}
                        // onPress={enhanceWithAI}
                        className="font-medium flex-1"
                        variant="secondary"
                    >
                        {/*{enhancing ? <Spinner size="sm" color="white"/> : "AI suggestion"}*/}
                        AI Suggestion
                    </Button>
                </div>
            </form>
        </Form>
    )
}