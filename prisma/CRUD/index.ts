import {
    getAllPostsFromDB,
    getSinglePostFromDB,
    findPostToDeleteFromDB,
    postSinglePostToDB,
    deleteSinglePostFromDB
} from "@/prisma/CRUD/posts";
import {getUser, updateSubscriptionStatus} from "@/prisma/CRUD/user"
import {likePost,postAlreadyLiked, unlikePost} from "@/prisma/CRUD/like"
import {addComment, getAllPostComments} from "@/prisma/CRUD/comment"

export {
    getAllPostsFromDB,
    getSinglePostFromDB,
    findPostToDeleteFromDB,
    postSinglePostToDB,
    deleteSinglePostFromDB,
    getUser,
    likePost,
    postAlreadyLiked,
    unlikePost,
    addComment,
    getAllPostComments,
    updateSubscriptionStatus
}