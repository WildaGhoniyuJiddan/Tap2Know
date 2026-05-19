/** @type {import('next').NextConfig} */
const nextConfig = {
  // Mengizinkan koneksi HMR dari IP lokal wifi agar bisa testing live di HP
  allowedDevOrigins: ['192.168.18.22', 'localhost:3000'],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'd8j0ntlcm91z4.cloudfront.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;