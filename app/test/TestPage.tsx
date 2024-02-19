"use client"

import * as React from "react";
import {useState} from "react";
import Post from "@/app/feed/components/Post";
import PaginationSectionPost from "@/components/PaginationSectionPost";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {PersonIcon} from "@radix-ui/react-icons";
import LoaderSmall from "@/components/LoaderSmall";

export default function TestPage({posts}: any) {
    // Page state variables, in the future model the API to have a cursor and limit
    // Example:
    // @param {number} cursor Cursor to start from
    // @param {number} limit Limit to fetch
    // @returns {PaginatedResponse<RequestedPage>} Paginated page
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);

    // Calculate the index of the last and first post on the current page
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;

    // Extract the current posts to be displayed on the page
    const currentPosts = posts.slice(firstPostIndex, lastPostIndex)

    return (
        <>
            Test

            {/*{currentPosts?.map((post: any) => (*/}
            {/*    <Post key={post.id}*/}
            {/*          id={post.id}*/}
            {/*          userId={post.user.id}*/}
            {/*          name={post.user.name}*/}
            {/*          avatar={post.user.image}*/}
            {/*          createdAt={post.createdAt}*/}
            {/*          content={post.content}*/}
            {/*          likes={post.likes}*/}
            {/*          comments={post.comments}*/}
            {/*    />*/}
            {/*))}*/}

            {/*<PaginationSectionPost*/}
            {/*    postsPerPage={postsPerPage}*/}
            {/*    currentPage={currentPage}*/}
            {/*    setCurrentPage={setCurrentPage}*/}
            {/*    totalPosts={posts.length}/>*/}
        </>
    )
}