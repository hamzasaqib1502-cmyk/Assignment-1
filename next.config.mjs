/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "esskateboarding.com",
      },
      {
        protocol: "https",
        hostname: "talishko.com",
      },
      {
        protocol: "https",
        hostname: "www.itsbasic.com",
      },
      {
        protocol: "https",
        hostname: "www.terranovastyle.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
    ],
  },
};

export default nextConfig;
