/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.imgur.com", "lh3.googleusercontent.com", "k.kakaocdn.net"],
  },
  experimental: {
    scrollRestoration: "manual",
    outputStandalone: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: process.env.API_URL + "/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
