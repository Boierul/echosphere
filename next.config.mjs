/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        // Change domains to remotePatterns
        domains: ["lh3.googleusercontent.com", "avatars.githubusercontent.com"],
    },
};

export default nextConfig;
