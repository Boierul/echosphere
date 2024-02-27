"use client"

import Post from "@/app/feed/components/Post";
import {FeedInterface} from "@/types";
import * as React from "react";
import {useState} from "react";
import PaginationSectionPost from "@/components/PaginationSectionPost";

export default function Feed({posts}: FeedInterface) {
    /* ------------------------------------------------------------------------------------------------------------ */
    // // Post Fetching
    //
    // const [postsData, setPostsData] = useState<FeedInterface[]>([]);
    //
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const [posts] = await Promise.all([getAllPosts()]);
    //         setPostsData(posts);
    //     };
    //
    //     fetchData();
    // }, []);
    //
    // // Use another useEffect to log updated postsData
    // useEffect(() => {
    //     console.log(postsData);
    // }, [postsData]);

    /* ------------------------------------------------------------------------------------------------------------ */
    // Pagination

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);

    // Calculate the index of the last and first post on the current page
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;

    // Extract the current posts to be displayed on the page
    const currentPosts = posts?.slice(firstPostIndex, lastPostIndex)

    /* ------------------------------------------------------------------------------------------------------------ */

    return (
        <main>
            {currentPosts?.map((post) => (
                <Post
                    key={post.id}
                    id={post.id}
                    userId={post.user?.id}
                    name={post.user?.name}
                    avatar={post.user?.image || undefined}
                    createdAt={post.createdAt}
                    content={post.content}
                    likes={post.likes}
                    comments={post.comments}
                />
            ))}
            <div className="my-8">
                <PaginationSectionPost
                    postsPerPage={postsPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPosts={posts.length}/>
            </div>
        </main>
    )
}