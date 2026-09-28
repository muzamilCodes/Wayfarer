/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  images: { remotePatterns: [{ protocol: 'https', hostname: 'res.cloudinary.com' }], formats: ['image/avif', 'image/webp'] },
};
