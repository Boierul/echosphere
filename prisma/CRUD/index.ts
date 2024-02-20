import {
    getAllPostsFromDB,
    getSinglePostFromDB,
    findPostToDeleteFromDB,
    postSinglePostToDB,
    deleteSinglePostFromDB
} from "@/prisma/CRUD/posts";
import {getUser} from "@/prisma/CRUD/user"
import {likePost,postAlreadyLiked, unlikePost} from "@/prisma/CRUD/like"

export {
    getAllPostsFromDB,
    getSinglePostFromDB,
    findPostToDeleteFromDB,
    postSinglePostToDB,
    deleteSinglePostFromDB,
    getUser,
    likePost,
    postAlreadyLiked,
    unlikePost
}