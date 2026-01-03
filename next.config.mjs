/** @type {import('next').NextConfig} */
const repo = "my-recap-ejj"; 

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  // แก้ไข: นำ / ตัวสุดท้ายออกที่ assetPrefix
  basePath: process.env.NODE_ENV === "production" ? `/${repo}` : "",
  assetPrefix: process.env.NODE_ENV === "production" ? `/${repo}` : "",
};

export default nextConfig;

