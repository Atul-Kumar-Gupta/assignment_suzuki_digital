
/**
 * @type {import('next').NextConfig}
 */
const path = require("path");
const webpack = require("webpack");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  optimizeFonts: true,
  images: {
    domains: [
      'api.payhoy.in',
      'localhost',
      'cdn.payhoy.in',
      'payhoy.in',
      's3-jobzseed.s3.ap-south-1.amazonaws.com',
    ],
  },
  compress: true,
  compiler: {
    styledComponents: true,
  },
  env: {
    ImageUrl: "https://cdn.payhoy.in",
  },
  webpack: (config) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
      })
    );

    // Alias setup
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    config.resolve.alias['@components'] = path.resolve(__dirname, 'components');

    return config;
  },

  // Add headers to disable SEO
  // async headers() {
  //   return [
  //     {
  //       source: "/:path*", // Apply to all pages
  //       headers: [
  //         {
  //           key: "X-Robots-Tag",
  //           value: "noindex, nofollow", // Prevent indexing and crawling
  //         },
  //       ],
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
