import NextAuth from "next-auth/next";
import {authOptions} from "@/utils/authOptions";

export const handler = NextAuth(authOptions);
// Export the handler for both GET and POST methods
export const GET = handler.handlers.GET;
export const POST = handler.handlers.POST;