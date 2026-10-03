/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Disable disk pack cache in dev to avoid OneDrive sync conflicts
      // that corrupt .next cache and cause layout.css 404
      config.cache = false;
    }
    return config;
  },
};
