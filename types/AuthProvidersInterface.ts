interface Provider {
    id: string;
    name: string;
    type: string;
    signinUrl: string;
    callbackUrl: string;
}

export interface AuthProvidersInterface {
    providers: Record<string, Provider> | null;
}