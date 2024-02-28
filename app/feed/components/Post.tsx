"use client"

import {Card} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {
    ChatBubbleIcon,
    DotsHorizontalIcon,
    HeartFilledIcon,
    HeartIcon,
    PaperPlaneIcon,
    PersonIcon,
    TrashIcon
} from "@radix-ui/react-icons";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import * as React from "react";
import {useEffect, useState} from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import {toast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";

import {CommentsInterface, PostInterface} from "@/types";
import {createComment, deletePost, getAllSubscribedUsers, getCommentsPost, toggleLikePost} from "@/requests";
import {useMediaQuery} from "@/hooks/useMediaQuery";
import {formatDate} from "@/utils/formatDate";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {ScrollArea} from "@/components/ui/scroll-area";
import Loader from "@/components/Loader";
import {Badge} from "@/components/ui/badge";

import {motion} from "framer-motion";

export default function Post({
                                 id,
                                 avatar,
                                 userId,
                                 name,
                                 createdAt,
                                 content,
                                 likes,
                                 comments
                             }: PostInterface) {
    // Next-auth data
    const {data: session} = useSession();
    const {user} = session || {};
    const router = useRouter();
    // Check the window size for additional styling
    const isDesktop = useMediaQuery("(min-width: 768px)")

    const [loading, setLoading] = useState(false);
    // Dialog for Desktop popup for deleting a post
    const [openDeleteWindow, setOpenDeleteWindow] = React.useState(false)
    // Dialog for Desktop popup for comments
    const [openCommentsWindow, setOpenCommentsWindow] = React.useState(false)
    // Comment input state
    const [commentInputContent, setCommentInputContent] = useState("");
    // All comments for a post
    const [allComments, setAllComments] = useState<CommentsInterface[]>([]);

    // Check if the user has already liked the post
    const currentUserLiked =
        (session && likes.some((like) => like.userId === user?.id)) || false;

    // State to disable Input if the user in not logged in
    const [isNotLogged, setIsNotLogged] = useState(true);

    // Input disabled only takes booleans
    useEffect(() => {
        if (session) {
            setIsNotLogged(false)
        } else {
            setIsNotLogged(true)
        }
    }, [session]);

    /* ------------------------------------------------------------------------------------------------------------ */
    // Fetch pro users
    const [isProUser, setIsProUser] = useState([]);

    // Pro user badge
    useEffect(() => {
        if (isProUser.length === 0) {
            getProUsers();
        }
    }, [isProUser.length]);


    const getProUsers = async () => {
        // setLoading(true);
        try {
            const res = await getAllSubscribedUsers();
            setIsProUser(res)
            // setLoading(false);
        } catch (error) {
            console.error("Error fetching pro users:", error);
        }
    }

    /* ------------------------------------------------------------------------------------------------------------ */

    // Set the postId for the comment while retrieving all comments fot that post
    async function setPostId() {
        await getComments();
    }

    // Fetch all comments for that post
    const getComments = async () => {
        setLoading(true);
        try {
            const res = await getCommentsPost(id);

            if (res.ok) {
                router.refresh();
            }

            const data = await res.json();
            setAllComments(data)
            router.refresh();

            setLoading(false);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    }

    // Add a comment for the post
    const addComment = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setCommentInputContent("");

        const res = await createComment(commentInputContent, id);

        if (res.ok) {
            router.refresh();
        }

        await getComments()

        toast({
            title: "Comment successfully added",
            description: "Great job on sharing your opinion.",
            duration: 2000
        })
    }

    // Like/Unlike a post
    const likeUnlikePost = async (id: string) => {
        setLoading(true);

        const res = await toggleLikePost(id);
        // Parse the JSON response to get the custom message
        const data = await res.json();

        if (data.message === "Post Liked") {
            toast({
                title: "Post successfully liked",
                description: "Together we can achieve great things.",
                duration: 2000
            })
        }

        if (data.message === "Post Unliked") {
            toast({
                title: "Post successfully unliked",
                description: "Maybe that post wasn't that good anyway.",
                duration: 2000
            })
        }

        if (res.ok) {
            router.refresh();
        }

        setLoading(false);
    };

    // Delete a post
    async function deleteThePost() {
        setLoading(true);

        const res = await deletePost(id);

        if (res.ok) {
            router.refresh();
        }

        setLoading(false);

        toast({
            title: "Post successfully deleted",
            description: "Great ideas take time. Try to share a better one.",
            duration: 2000
        })
    }

    return (
        <Card className="p-2 my-4 rounded-lg">
            <div id="card-header" className="flex flex-row items-center p-4">
                {/* Render all the Pro user badges */}
                {isProUser.length > 0 && (
                    <div>
                        {isProUser.map((proUser: { id: string }) => {
                            if (proUser.id === userId) {
                                return (
                                    <motion.div
                                        key={proUser.id}
                                        className="z-20 absolute ml-[30px] mt-[-34px]"
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        transition={{duration: 0.3}}
                                    >
                                        <Badge
                                            className="bg-amber-500 text-[9px] rounded-full z-20 border-white dark:border-black"
                                        >
                                            Pro
                                        </Badge>
                                    </motion.div>
                                );
                            }
                            // Return null if there's no match
                            return null;
                        })}
                        </div>
                        )}
                            <div
                                className={`${userId === user?.id ? 'flex items-center justify-center min-w-[56px] min-h-[56px] rounded-full bg-neutral-800 dark:bg-neutral-100' : ''}`}>
                                <div
                                    className="flex items-center justify-center min-w-[52px] min-h-[52px] rounded-full bg-white dark:bg-black">
                                    <Avatar
                                        className="w-12 h-12">
                                        <AvatarImage src={avatar} alt="avatar"/>
                                        <AvatarFallback>
                                            <PersonIcon/>
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                            </div>

                            <div className="flex justify-between w-full">
                                <div className="pl-4">
                                    <div className="font-bold text-sm sm:text-lg">{name}</div>
                                    <div className="text-xs text-stone-500 sm:text-sm">
                                        {formatDate(createdAt)}
                                    </div>
                                </div>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        {userId === user?.id ?
                                            <Button variant="ghost" style={{
                                                marginTop: "-4px",
                                                marginRight: "-12px"
                                            }}>
                                                <DotsHorizontalIcon/>
                                            </Button> : <></>}
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-20 sm:w-44">
                                        <DropdownMenuLabel>{name}</DropdownMenuLabel>
                                        <DropdownMenuSeparator/>
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem className="cursor-pointer">
                                                Archive
                                                <DropdownMenuShortcut
                                                    className="hidden sm:block">⇧⌘A</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer">
                                                Edit post
                                                <DropdownMenuShortcut
                                                    className="hidden sm:block">⇧⌘E</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer">
                                                Settings
                                                <DropdownMenuShortcut
                                                    className="hidden sm:block">⇧⌘S</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                            <div id="card-body" className="p-4 py-2">
                                <p className="pr-4">
                                    {content}
                                </p>
                            </div>

                            <div className="flex px-4 items-center gap-3 mb-4">
                                <div
                                    className={`flex items-center ${session ? 'hover:text-stone-700 cursor-pointer dark:hover:text-stone-300' : 'text-stone-400 pointer-events-none cursor-default'}`}>
                                    {currentUserLiked ?
                                        <HeartFilledIcon onClick={() => session && likeUnlikePost(id)}/>
                                        :
                                        <HeartIcon onClick={() => session && likeUnlikePost(id)}/>}
                                    <p className="pl-2 text-sm">{likes.length}</p>
                                </div>

                                {isDesktop ?
                                    <Dialog open={openCommentsWindow} onOpenChange={setOpenCommentsWindow}>
                                        <DialogTrigger asChild>
                                            <div
                                                onClick={setPostId}
                                                className="flex hover:text-stone-700 cursor-pointer items-center dark:hover:text-stone-300">
                                                <ChatBubbleIcon/>
                                                <p className="pl-2 text-sm">{comments.length}</p>
                                            </div>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-[610px] h-fit">
                                            <DialogHeader className="mt-2">
                                                <DialogTitle className="text-4xl">Comments</DialogTitle>
                                            </DialogHeader>
                                            <div className="flex flex-col gap-3">
                                                {comments.length === 0 ?
                                                    <ScrollArea className="h-72 w-full rounded-md border">
                                                        <div
                                                            className="flex flex-col justify-center items-center h-[280px]">
                                                            <div className="flex flex-col justify-center items-center">
                                                                <h1 className="mb-2 text-lg text-black dark:text-white">No
                                                                    comments
                                                                    yet</h1>
                                                                <p className="text-xs text-stone-700 dark:text-stone-300">Start
                                                                    the
                                                                    conversation.</p>
                                                            </div>
                                                        </div>
                                                    </ScrollArea>
                                                    :
                                                    <ScrollArea className="h-72 w-full rounded-md border">
                                                        {!loading ? allComments.map((comment, index) => (
                                                                <div key={index}
                                                                     className={`px-4 pt-2 flex justify-start ${index === allComments.length - 1 ? 'pb-2' : ''}`}>
                                                                    <Avatar className="w-12 h-12">
                                                                        <AvatarImage src={comment?.user?.image}
                                                                                     alt="avatar"/>
                                                                        <AvatarFallback>
                                                                            <PersonIcon/>
                                                                        </AvatarFallback>
                                                                    </Avatar>
                                                                    <div
                                                                        className="flex justify-between items-center w-full">
                                                                        <div className="pl-4">
                                                                            <div
                                                                                className="font-bold text-xs">{comment.user.name}</div>
                                                                            <div className="text-sm">{comment.content}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                            :
                                                            <div
                                                                className="flex flex-col justify-center items-center h-[280px]">
                                                                <Loader/>
                                                            </div>}
                                                    </ScrollArea>
                                                }
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <div className="grid flex-1 gap-2 pl-[2px]">
                                                    <Label htmlFor="link" className="sr-only">
                                                        Comment Input
                                                    </Label>
                                                    <Input
                                                        id="commentInput"
                                                        className="h-10 text-sm"
                                                        disabled={isNotLogged || loading}
                                                        placeholder={session ? "Add a comment." : "Please sign in to comment."}
                                                        onChange={(e) => setCommentInputContent(e.target.value)}
                                                        value={commentInputContent}
                                                    />
                                                </div>
                                                <Button type="submit" size="sm" variant="ghost" className="px-3"
                                                        onClick={addComment}
                                                        disabled={isNotLogged || loading}>
                                                    <span className="sr-only">Post Comment</span>
                                                    <PaperPlaneIcon className="h-4 w-4"/>
                                                </Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                    :
                                    <Drawer open={openCommentsWindow} onOpenChange={setOpenCommentsWindow}>
                                        <DrawerTrigger asChild>
                                            <div
                                                onClick={setPostId}
                                                className="flex hover:text-stone-700 cursor-pointer items-center dark:hover:text-stone-300">
                                                <ChatBubbleIcon/>
                                                <p className="pl-2 text-sm">{comments.length}</p>
                                            </div>
                                        </DrawerTrigger>
                                        <DrawerContent className="h-5/6">
                                            <DrawerHeader className="text-left">
                                                <DrawerTitle className="text-3xl">Comments</DrawerTitle>
                                            </DrawerHeader>
                                            {comments.length === 0 ?
                                                <ScrollArea
                                                    className="h-5/6 w-full border-y border-y-neutral-100 dark:border-y-neutral-900">
                                                    <div
                                                        className="flex flex-col justify-center items-center h-[320px]">
                                                        <div className="flex flex-col justify-center items-center">
                                                            <h1 className="mb-2 text-lg text-black dark:text-white">No
                                                                comments yet</h1>
                                                            <p className="text-xs text-stone-700 dark:text-stone-300">Start
                                                                the
                                                                conversation.</p>
                                                        </div>
                                                    </div>
                                                </ScrollArea>
                                                :
                                                <ScrollArea
                                                    className="h-5/6 w-full border-y border-y-neutral-100 dark:border-y-neutral-900">
                                                    {!loading ? allComments.map((comment, index) => (
                                                            <div key={index}
                                                                 className={`px-4 pt-4 flex justify-start ${index === allComments.length - 1 ? 'pb-2' : ''}`}>
                                                                <Avatar className="w-8 h-8">
                                                                    <AvatarImage src={comment?.user?.image} alt="avatar"/>
                                                                    <AvatarFallback>
                                                                        <PersonIcon/>
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                <div className="flex justify-between items-center w-full">
                                                                    <div className="pl-4">
                                                                        <div
                                                                            className="font-bold text-xs">{comment.user.name}</div>
                                                                        <div className="text-sm">{comment.content}</div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        ))
                                                        :
                                                        <div
                                                            className="flex flex-col justify-center items-center h-[320px]">
                                                            <Loader/>
                                                        </div>}
                                                </ScrollArea>

                                            }
                                            <div className="flex items-center space-x-2 my-4 ml-4 mr-2">
                                                <div className="grid flex-1 gap-2 pl-[2px]">
                                                    <Label htmlFor="link" className="sr-only">
                                                        Comment Input
                                                    </Label>
                                                    <Input
                                                        id="commentInput"
                                                        className="h-10 text-sm"
                                                        disabled={isNotLogged || loading}
                                                        placeholder={session ? "Add a comment." : "Please sign in to comment."}
                                                        onChange={(e) => setCommentInputContent(e.target.value)}
                                                        value={commentInputContent}
                                                    />
                                                </div>
                                                <Button type="submit" size="sm" variant="ghost" className="px-3"
                                                        onClick={addComment}
                                                        disabled={isNotLogged || loading}>
                                                    <span className="sr-only">Post Comment</span>
                                                    <PaperPlaneIcon className="h-4 w-4"/>
                                                </Button>
                                            </div>
                                        </DrawerContent>
                                    </Drawer>
                                }

                                {
                                    isDesktop && userId === user?.id ?
                                        (<Dialog open={openDeleteWindow} onOpenChange={setOpenDeleteWindow}>
                                            <DialogTrigger asChild>
                                                <div
                                                    className="flex hover:text-stone-700 cursor-pointer items-center dark:hover:text-stone-300">
                                                    <div className="">
                                                        <TrashIcon/>
                                                    </div>
                                                    {/*<p className="pl-1 text-xs">Delete</p>*/}
                                                </div>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[610px] h-52">
                                                <DialogHeader className="mt-6">
                                                    <DialogTitle className="text-4xl">Delete post</DialogTitle>
                                                    <DialogDescription className="text-md">
                                                        This action will permanently delete this post
                                                    </DialogDescription>
                                                    <div className="flex flex-row gap-3">
                                                        <DialogClose asChild>
                                                            <Button type="submit" className="flex-1 mt-6"
                                                                    onClick={deleteThePost}>
                                                                Delete
                                                            </Button>
                                                        </DialogClose>
                                                        <DialogClose asChild>
                                                            <Button variant="outline" className="flex-1 mt-6">
                                                                Cancel
                                                            </Button>
                                                        </DialogClose>
                                                    </div>
                                                </DialogHeader>
                                            </DialogContent>
                                        </Dialog>)
                                        :
                                        (userId === user?.id ?
                                            <Drawer open={openDeleteWindow} onOpenChange={setOpenDeleteWindow}>
                                                <DrawerTrigger asChild>
                                                    <div
                                                        className="flex hover:text-stone-700 cursor-pointer items-center dark:hover:text-stone-300">
                                                        <TrashIcon/>
                                                        {/*<p className="pl-1 text-xs">Delete</p>*/}
                                                    </div>
                                                </DrawerTrigger>
                                                <DrawerContent className="h-72">
                                                    <DrawerHeader className="text-left">
                                                        <DrawerTitle className="text-3xl">Delete post</DrawerTitle>
                                                        <DrawerDescription>
                                                            This action will permanently delete this post
                                                        </DrawerDescription>
                                                    </DrawerHeader>
                                                    <form className="grid items-start gap-2 px-4 mt-6">
                                                        <DrawerClose asChild>
                                                            <Button onClick={deleteThePost}>Delete</Button>
                                                        </DrawerClose>
                                                        <DrawerClose asChild>
                                                            <Button variant="outline">Cancel</Button>
                                                        </DrawerClose>
                                                    </form>
                                                </DrawerContent>
                                            </Drawer> : '')
                                }
                            </div>
                        </Card>
                        )
                        }