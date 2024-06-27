/** @type {import('next').NextConfig} */

import dotenv from 'dotenv';
dotenv.config();

const nextConfig = {
  env: {
    DB_URI: process.env.DB_URI,
    API: process.env.API,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    CLOUDINARY_UPLOAD_PRESET: process.env.CLOUDINARY_UPLOAD_PRESET,
    CLOUDINARY_URL: CLOUDINARY_URL
  }
};

export default nextConfig;
