import {Card, CardHeader} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {formatDate} from "@/utils/formatDate";
import {Button} from "@/components/ui/button";
import {DotsHorizontalIcon, HeartIcon} from "@radix-ui/react-icons";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function Post() {
    return (
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
                                    <DropdownMenuShortcut className="hidden sm:block">⇧⌘D</DropdownMenuShortcut>
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
    )
}