import * as React from "react";

export interface PaginationSectionPostInterface {
    totalPosts: number;
    postsPerPage: number;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}