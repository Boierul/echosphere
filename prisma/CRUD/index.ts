import {
    getAllPostsFromDB,
    getSinglePostFromDB,
    findPostToDeleteFromDB,
    postSinglePostToDB,
    deleteSinglePostFromDB
} from "@/prisma/CRUD/posts";
import {getUser} from "@/prisma/CRUD/user"

export {
    getAllPostsFromDB,
    getSinglePostFromDB,
    findPostToDeleteFromDB,
    postSinglePostToDB,
    deleteSinglePostFromDB,
    getUser
}