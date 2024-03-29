"use client"

import Filter from "bad-words";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {useToast} from "@/components/ui/use-toast";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useSession} from "next-auth/react";

import {createPost} from "@/requests/createPost";
import {askChatGPTForSuggestion} from "@/requests";
import Loader from "@/components/Loader";
import LoaderInverted from "@/components/LoaderInverted";

// Filter profanities
const filter = new Filter();

export default function AddPost() {
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
    }, [session,isNotLogged]);

    /* ------------------------------------------------------------------------------------------------------------ */

    const router = useRouter();
    const {toast} = useToast()

    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    // AI phrase generation temp storage
    const [enhancing, setEnhancing] = useState(false);

    useEffect(() => {
        setValue("message", content)
    }, [content]);

    const enhanceWithAI = async () => {
        setEnhancing(true);
        const res = await askChatGPTForSuggestion(content);
        const GPTdata = await res.json();
        setContent(GPTdata.content);
        setEnhancing(false);
    };

    // Profanity filter function
    function containsProfanity(str: string) {
        return filter.isProfane(str)
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
            })
    })

    // Zod Form object
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        mode: `onChange`,
        defaultValues: {
            message: ""
        }
    })

    const {
        register,
        control,
        formState,
        watch,
        getValues,
        setValue,
        reset,
        trigger,
    } = form;

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setLoading(true)
        const res = await createPost(data.message);
        if (res.ok) {
            reset({
                message: "",
            })
            setContent("");
            setLoading(false)
            router.refresh();
        }

        toast({
            title: "Post successfully submitted",
            description: "You shared a great idea.",
            duration: 2000
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
                                    {session ? "Share your thoughts" : "Please sign in to post."}
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder={session ? "Give it a try and test it out" : ""}
                                        className="resize-none h-28 rounded-lg"
                                        disabled={enhancing || loading || isNotLogged}
                                        onChangeCapture={(e) => {
                                            setContent(e.currentTarget.value)
                                        }}
                                        {...field}
                                    />
                                </FormControl>
                                <div id="form-error" className="mb-2 flex flex-row justify-between">
                                    <div>
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
                        disabled={enhancing || loading || !session}
                        style={{minWidth: "10rem"}}
                    >
                        {loading ? <LoaderInverted/> : "Post"}
                    </Button>

                    <Button
                        disabled={enhancing || loading || !session}
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