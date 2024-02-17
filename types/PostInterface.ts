import {Like, User} from "@prisma/client";

export interface PostInterface {
    id: string;
    userId: string;
    name: string | null;
    avatar?: string;
    createdAt: string;
    content: string;
    likes: Like[];
    comments: {
        id: string;
        user: User;
        createdAt: string;
        content: string;
    }[];
}