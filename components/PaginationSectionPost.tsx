import {PaginationSectionPostInterface} from "@/types";
import {
    Pagination,
    PaginationContent,
    PaginationFirst,
    PaginationItem,
    PaginationLast,
    PaginationLink
} from "@/components/ui/pagination";
import * as React from "react";
import {useEffect} from "react";

// PaginationSection component responsible for rendering pagination controls
export default function PaginationSectionPost({
                                                  totalPosts,
                                                  postsPerPage,
                                                  currentPage,
                                                  setCurrentPage,
                                              }: PaginationSectionPostInterface) {
    // Scroll to the top when currentPage changes
    useEffect(() => {
        // If it does not smooth properly get rid of behaviour or install a lib
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    // Calculate page numbers based on total posts and posts per page
    let pageNumbers: number[] = [];
    for (let i = 1; i < Math.ceil(totalPosts / postsPerPage) + 1; i++) {
        pageNumbers.push(i)
    }

    // Maximum page numbers to display at once
    const maxPageNum = 3;
    // Current page should be in the middle if possible
    const pageNumLimit = Math.floor(maxPageNum / 2);

    const handleFirstPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(1);
        }
    };

    const handleLastPage = () => {
        const lastPage = Math.ceil(totalPosts / postsPerPage);
        if (currentPage !== lastPage) {
            setCurrentPage(lastPage);
        }
    };

    const renderPages = () => {
        const renderedPages = [];

        // Case 1: Less than or equal to 3 pages
        if (pageNumbers.length <= maxPageNum) {
            renderedPages.push(...pageNumbers.map(page => (
                <PaginationItem
                    key={page}
                    className={`cursor-pointer ${currentPage === page ? "bg-neutral-100 rounded-md dark:bg-neutral-800" : ""}`}
                >
                    <PaginationLink onClick={() => setCurrentPage(page)}>
                        {page}
                    </PaginationLink>
                </PaginationItem>
            )));
        } else {
            // Case 2: Current page is less than or equal to pageNumLimit
            if (currentPage <= pageNumLimit + 1) {
                renderedPages.push(...pageNumbers.slice(0, maxPageNum).map(page => (
                    <PaginationItem
                        key={page}
                        className={`cursor-pointer ${currentPage === page ? "bg-neutral-100 rounded-md dark:bg-neutral-800" : ""}`}
                    >
                        <PaginationLink onClick={() => setCurrentPage(page)}>
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                )));
            }
            // Case 3: Current page is greater than pageNumLimit
            else if (currentPage >= pageNumbers.length - pageNumLimit) {
                renderedPages.push(...pageNumbers.slice(pageNumbers.length - maxPageNum).map(page => (
                    <PaginationItem
                        key={page}
                        className={`cursor-pointer ${currentPage === page ? "bg-neutral-100 rounded-md dark:bg-neutral-800" : ""}`}
                    >
                        <PaginationLink onClick={() => setCurrentPage(page)}>
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                )));
            } else {
                renderedPages.push(...pageNumbers.slice(currentPage - pageNumLimit - 1, currentPage + pageNumLimit).map(page => (
                    <PaginationItem
                        key={page}
                        className={`cursor-pointer ${currentPage === page ? "bg-neutral-100 rounded-md dark:bg-neutral-800" : ""}`}
                    >
                        <PaginationLink onClick={() => setCurrentPage(page)}>
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                )));
            }
        }

        return renderedPages;
    };


    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem className={`cursor-pointer ${currentPage <= 1 ? "pointer-events-none opacity-50 cursor-default" : undefined}`}>
                    <PaginationFirst onClick={handleFirstPage}/>
                </PaginationItem>
                {renderPages()}
                <PaginationItem className={`cursor-pointer ${currentPage >= pageNumbers.length ? "pointer-events-none opacity-50 cursor-default" : undefined}`}>
                    <PaginationLast onClick={handleLastPage}/>
                </PaginationItem>
            </PaginationContent>
        </Pagination>)
}