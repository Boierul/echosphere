"use client"

import {Card} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {ChatBubbleIcon, DotsHorizontalIcon, HeartIcon, PersonIcon, TrashIcon} from "@radix-ui/react-icons";
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
import Link from "next/link";
import * as React from "react";
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

import {PostInterface} from "@/types";
import {deletePost} from "@/requests";
import {useMediaQuery} from "@/hooks/useMediaQuery";
import {formatDate} from "@/utils/formatDate";
import linkify from "@/utils/linkify";

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
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    const router = useRouter();

    // Next-auth data
    const {data: session} = useSession();
    const {user} = session || {};

    // Make the posts clickable for posts details
    const linkifiedContent = linkify(content);

    async function deleteThePost() {
        const res = await deletePost(id);

        if (res.ok) {
            router.refresh();
        }

        toast({
            title: "Post successfully deleted",
            description: "Great ideas take time. Try to share a better one.",
            duration: 2000
        })
    }

    return (
        <Card className="p-2 my-4 rounded-lg">
            <div id="card-header" className="flex flex-row items-center p-4">
                <div className={`${userId === user?.id ? 'flex items-center justify-center min-w-[56px] min-h-[56px] rounded-full bg-neutral-800 dark:bg-neutral-100' : ''}`}>
                    <div className="flex items-center justify-center min-w-[52px] min-h-[52px] rounded-full bg-white dark:bg-black">
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
                {/*<Link href={`/posts/${id}`}>*/}
                <Link href="/">
                    <p className="pr-4">
                        {linkifiedContent}
                    </p>
                </Link>
            </div>

            <div className="flex px-4 items-center gap-3 mb-4">
                <div className="flex hover:text-stone-400 cursor-pointer items-center">
                    <HeartIcon/>
                    <p className="pl-2 text-sm">{likes.length}</p>
                </div>

                <div className="flex hover:text-stone-400 cursor-pointer items-center">
                    <ChatBubbleIcon/>
                    <p className="pl-2 text-sm">{comments.length}</p>
                </div>

                {
                    isDesktop && userId === user?.id ?
                        (<Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <div className="flex hover:text-stone-400 cursor-pointer items-center">
                                    <div className="-ml-1">
                                        <TrashIcon/>
                                    </div>
                                    <p className="pl-1 text-sm">Delete</p>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[610px] h-52">
                                <DialogHeader className="mt-6">
                                    <DialogTitle className="text-xl">Delete post</DialogTitle>
                                    <DialogDescription className="text-md">
                                        This action will permanently delete this post
                                    </DialogDescription>
                                    <div className="flex flex-row gap-3">
                                        <DialogClose asChild>
                                            <Button type="submit" className="flex-1 mt-6" onClick={deleteThePost}>
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
                        (userId === user?.id ? <Drawer open={open} onOpenChange={setOpen}>
                            <DrawerTrigger asChild>
                                <div className="flex hover:text-stone-400 cursor-pointer items-center">
                                    <TrashIcon/>
                                    <p className="pl-1 text-sm">Delete</p>
                                </div>
                            </DrawerTrigger>
                            <DrawerContent className="h-72">
                                <DrawerHeader className="text-left mt-8">
                                    <DrawerTitle>Delete post</DrawerTitle>
                                    <DrawerDescription>
                                        This action will permanently delete this post
                                    </DrawerDescription>
                                </DrawerHeader>
                                <form className="grid items-start gap-2 px-4">
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