/** @type {import('next').NextConfig} */

import dotenv from 'dotenv';
dotenv.config();

const nextConfig = {
  DB_URI: process.env.DB_URI
};

export default nextConfig;
