"use client"

import * as React from "react"
import Spacer from "@/components/Spacer";
import AddPostSkeleton from "@/app/feed/components/skeleton/AddPostSkeleton";
import FeedPostsSkeleton from "@/app/feed/components/skeleton/FeedPostsSkeleton";
import AddPost from "@/app/feed/components/AddPost";
import Feed from "@/app/feed/components/Feed";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator, DropdownMenuShortcut,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {DotsHorizontalIcon} from "@radix-ui/react-icons";
import Link from "next/link";
import {Card} from "@/components/ui/card";
import {
    Drawer, DrawerClose,
    DrawerContent,
    DrawerDescription, DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import {useMediaQuery} from "@/hooks/useMediaQuery";
import useWindowSize from "@/hooks/useWindowSize";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";

export default function ModeToggle() {
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    // if (isDesktop) {
    //     return (
    //         <Dialog open={open} onOpenChange={setOpen}>
    //             <DialogTrigger asChild>
    //                 <Button variant="outline">Edit Profile</Button>
    //             </DialogTrigger>
    //             <DialogContent className="sm:max-w-[425px]">
    //                 <DialogHeader>
    //                     <DialogTitle>Edit profile</DialogTitle>
    //                     <DialogDescription>
    //                         Make changes to your profile here. Click save when you are done.
    //                     </DialogDescription>
    //                 </DialogHeader>
    //                 <ProfileForm />
    //             </DialogContent>
    //         </Dialog>
    //     )
    // }

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
                                                Delete post
                                                <DropdownMenuShortcut
                                                    className="hidden sm:block">⇧⌘D</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        <div id="card-body" className="p-4">
                            {/*<Link href={`/posts/${id}`}>*/}
                            <Link href="/">
                                <p className="pr-4">
                                    {/*{linkifiedContent}*/}
                                    The White Stripes - Fell In Love With a Girl
                                </p>
                            </Link>
                        </div>

                        <div id="card-footer" className="p-4 flex gap-3 items-center">
                            <p className="text-stone-500 text-sm">
                                {/*{comments.length} {comments.length === 1 ? "comment" : "comments"}*/}
                                0 likes
                            </p>
                            {/*<HeartIcon/>*/}

                            <p className="text-stone-500 text-sm">
                                {/*{comments.length} {comments.length === 1 ? "comment" : "comments"}*/}
                                0 comments
                            </p>

                        </div>
                    </Card>

                    {/*<Drawer>*/}
                    {/*    <DrawerTrigger asChild>*/}
                    {/*        <Button variant="outline">Open Drawer</Button>*/}
                    {/*    </DrawerTrigger>*/}
                    {/*    <DrawerContent>*/}
                    {/*        <div className="mx-auto w-full max-w-sm">*/}
                    {/*            <DrawerHeader>*/}
                    {/*                <DrawerTitle>Move Goal</DrawerTitle>*/}
                    {/*                <DrawerDescription>Set your daily activity goal.</DrawerDescription>*/}
                    {/*            </DrawerHeader>*/}
                    {/*        </div>*/}
                    {/*    </DrawerContent>*/}
                    {/*</Drawer>*/}

                    <Drawer open={open} onOpenChange={setOpen}>
                        <DrawerTrigger asChild>
                            <Button variant="outline">Edit Profile</Button>
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

                </div>
            </div>
        </main>
    )
}
