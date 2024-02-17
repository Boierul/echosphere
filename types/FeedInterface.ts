import {Like, User} from "@prisma/client";

export interface FeedInterface {
    posts: {
        id: string;
        content: string;
        user: User;
        createdAt: string;
        likes: Like[];
        comments: {
            id: string;
            user: User;
            createdAt: string;
            content: string;
        }[];
    }[];
}