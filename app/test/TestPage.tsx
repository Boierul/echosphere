"use client"

import * as React from "react";
import {useState} from "react";
import {Pagination, PaginationContent, PaginationItem, PaginationLink} from "@/components/ui/pagination";
import Post from "@/app/feed/components/Post";

export default function TestPage({posts} : any) {
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
            {currentPosts?.map((post:any) => (
                <Post key={post.id}
                      id={post.id}
                      userId={post.user.id}
                      name={post.user.name}
                      avatar={post.user.image}
                      createdAt={post.createdAt}
                      content={post.content}
                      likes={post.likes}
                      comments={post.comments}
                />
            ))}

            <PaginationSection
                postsPerPage={postsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPosts={posts.length}/>
        </>
    )
}

// PaginationSection component responsible for rendering pagination controls
function PaginationSection({
                               totalPosts,
                               postsPerPage,
                               currentPage,
                               setCurrentPage,
                           }: {
    totalPosts: any;
    postsPerPage: any;
    currentPage: any;
    setCurrentPage: any;
}) {
    // Calculate page numbers based on total posts and posts per page
    let pageNumbers = [];
    for (let i = 1; i < Math.ceil(totalPosts / postsPerPage) + 1; i++) {
        pageNumbers.push(i)
    }

    // Maximum page numbers to display at once
    const maxPageNum = 3;
    // Current page should be in the middle if possible
    const pageNumLimit = Math.floor(maxPageNum / 2);

    // Calculate which page numbers to display based on the current page
    let activePages = pageNumbers.slice(
        Math.max(0, currentPage - 1 - pageNumLimit),
        Math.min(currentPage - 1 + pageNumLimit + 1, pageNumbers.length)
    );

    const handleNextPage = () => {
        if (currentPage < pageNumbers.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Function to render page numbers with ellipsis
    const renderPages = () => {
        const renderedPages = activePages.map((page, idx) => (
            <PaginationItem
                key={idx}
                className={`cursor-pointer ${currentPage === page ? "cursor-pointer bg-neutral-100 rounded-md dark:bg-neutral-800" : ""}`}
            >
                <PaginationLink onClick={() => setCurrentPage(page)}>
                    {page}
                </PaginationLink>
            </PaginationItem>
        ));

        // // Add ellipsis at the start if necessary
        // if (activePages[0] > 1) {
        //     renderedPages.unshift(
        //         <PaginationEllipsis
        //             key="ellipsis-start"
        //             onClick={() => setCurrentPage(activePages[0] - 1)}
        //         />
        //     );
        // }

        // // Add ellipsis at the end if necessary
        // if (activePages[activePages.length - 1] < pageNumbers.length) {
        //     renderedPages.push(
        //         <PaginationEllipsis
        //             key="ellipsis-end"
        //             onClick={() =>
        //                 setCurrentPage(activePages[activePages.length - 1] + 1)
        //             }
        //         />
        //     );
        // }

        return renderedPages;
    };


    return (
        <Pagination>
            <PaginationContent>
                {renderPages()}
            </PaginationContent>
        </Pagination>)
}

// <Pagination>
//     <PaginationContent>
//         <PaginationItem className="cursor-pointer">
//             <PaginationPrevious onClick={handlePrevPage}/>
//         </PaginationItem>
//         {renderPages()}
//         <PaginationItem className="cursor-pointer">
//             <PaginationNext onClick={handleNextPage}/>
//         </PaginationItem>
//     </PaginationContent>
// </Pagination>)
