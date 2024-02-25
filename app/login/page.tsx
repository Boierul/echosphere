import {getProviders} from "next-auth/react";
import LoginPage from "@/app/login/components/LoginPage";

export default async function Login() {
    // Get the auth providers
    const providers = await getProviders()
    return (
        <main>
            <LoginPage providers={providers}/>
        </main>
    )
}
