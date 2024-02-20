import {askChatGPTForSuggestion} from "@/requests/openaiSuggestion";
import {getAllPosts} from "@/requests/getAllPosts";
import {deletePost} from "@/requests/deletePost";
import {createPost} from "@/requests/createPost";
import {toggleLikePost} from "@/requests/toggleLikePost";

export {askChatGPTForSuggestion, getAllPosts, createPost, deletePost, toggleLikePost}