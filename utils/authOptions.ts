import {NextAuthOptions} from "next-auth";
import prisma from "@/lib/prisma";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        session: async ({session, token, user}) => {
            if (session?.user) {
                session.user.id = user.id;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    }
};