/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    remotePatterns:[
      {
        hostname:"loremflickr.com"
      },
      {
        hostname:"localhost"
      },
      {
        hostname:"kvhxfuyfczradcderjky.supabase.co"
      }
    ]
  }
}

module.exports = nextConfig
