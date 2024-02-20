import NextAuth, {NextAuthOptions} from "next-auth";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import prisma from "@/lib/prisma";

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

            // TODO: Implement once Stipe is added
            // const userData = await fetch(`${process.env.NEXTAUTH_URL}/api/user?userId=${user.id}`)
            //     .then(response => response.json());
            // session.user.subscriptionStatus = userData.subscriptionStatus;
            return session;
        },
    },
    pages : {
        signIn: "/login",
    }
};

const handler = NextAuth(authOptions);
// Export the handler for both GET and POST methods
export { handler as GET, handler as POST};