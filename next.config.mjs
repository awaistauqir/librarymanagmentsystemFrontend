/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXTAUTH_SECRET: "lsdkmlskdmflksdkskmsdnkj",
  },
  images: {
    domains: ["images.unsplash.com"],
  },
};

export default nextConfig;
