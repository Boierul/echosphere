"use client"

import * as React from "react"
import Spacer from "@/components/Spacer";
import AddPost from "@/app/feed/components/AddPost";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
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
import {Button} from "@/components/ui/button";
import {ChatBubbleIcon, DotsHorizontalIcon, HeartIcon, TrashIcon} from "@radix-ui/react-icons";
import Link from "next/link";
import {Card} from "@/components/ui/card";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import {useMediaQuery} from "@/hooks/useMediaQuery";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

export default function ModeToggle() {
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    return (
        <main>
            <Spacer/>

            <div className="container max-w-2xl mt-10 items-center">
                <h1 className="font-bold text-6xl mb-4">
                    Feed
                </h1>

                <div className="mb-12">
                    {/*<AddPostSkeleton/>*/}
                    <AddPost/>
                </div>

                <div>
                    {/*<FeedPostsSkeleton/>*/}
                    <Card className="p-2 my-4 rounded-lg">
                        <div id="card-header" className="flex flex-row items-center p-4">
                            <Avatar className="w-12 h-12">
                                <AvatarImage src="https://avatars.githubusercontent.com/u/49337867?v=4" alt="@boierul"/>
                                <AvatarFallback>DP</AvatarFallback>
                            </Avatar>

                            <div className="flex justify-between w-full">
                                <div className="pl-4">
                                    <div className="font-bold">Dan Pintea</div>
                                    <div className="text-xs text-stone-500 sm:text-sm">
                                        {/*{formatDate(createdAt)}*/}
                                        February 6, 2024 at 12:08 AM
                                    </div>
                                </div>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" style={{
                                            marginTop: "-4px"
                                        }}>
                                            <DotsHorizontalIcon/>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-20 sm:w-44">
                                        <DropdownMenuLabel>Username</DropdownMenuLabel>
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
                                    {/*{linkifiedContent}*/}
                                    The White Stripes - Fell In Love With a Girl
                                </p>
                            </Link>
                        </div>

                        <div className="flex px-4 items-center gap-3 mb-4">
                            <div className="flex hover:text-stone-400 cursor-pointer items-center">
                                <HeartIcon/>
                                {/*            /!*{comments.length} {comments.length === 1 ? "comment" : "comments"}*!/*/}
                                <p className="pl-2 text-sm">0</p>
                            </div>

                            <div className="flex hover:text-stone-400 cursor-pointer items-center">
                                <ChatBubbleIcon/>
                                {/*            /!*{comments.length} {comments.length === 1 ? "comment" : "comments"}*!/*/}
                                <p className="pl-2 text-sm">0</p>
                            </div>

                            {
                                isDesktop ?
                                    <Dialog open={open} onOpenChange={setOpen}>
                                        <DialogTrigger asChild>
                                            <div className="flex hover:text-stone-400 cursor-pointer items-center">
                                                <TrashIcon/>
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
                                                    <Button type="submit" className="flex-1 mt-6">Delete</Button>
                                                    <Button variant="outline"
                                                            className="flex-1 mt-6">Cancel</Button>
                                                </div>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
                                    :
                                    <Drawer open={open} onOpenChange={setOpen}>
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
                                                <Button type="submit">Delete</Button>
                                                <DrawerClose asChild>
                                                    <Button variant="outline">Cancel</Button>
                                                </DrawerClose>
                                            </form>
                                        </DrawerContent>
                                    </Drawer>
                            }
                        </div>
                    </Card>

                </div>
            </div>
        </main>
    )
}
