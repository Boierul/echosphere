import NextAuth from "next-auth";
import {authOptions} from "@/utils/authOptions";

const handler = NextAuth(authOptions);
// Export the handler for both GET and POST methods
export { handler as GET, handler as POST};