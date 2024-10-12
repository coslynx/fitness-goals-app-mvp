/**
 * @file packages/fitness-tracker/next.config.js
 * @description Configuration file for Next.js, defining settings for environment variables, asset optimization, and routing configurations. 
 * @author CosLynxAI
 */

const { withSentryConfig } = require('@sentry/nextjs');
const withNextAuth = require('next-auth/react');

/**
 * @description The main Next.js configuration object.
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'lh3.googleusercontent.com', // For Google Profile Images
      'scontent.xx.fbcdn.net',  // For Facebook Profile Images
    ],
  },
  // Optional: Configure the NextAuth.js provider for user authentication
  // This can be customized with more providers or custom authentication logic
  // See https://next-auth.js.org/configuration/providers
  // Example: 
  //   ... 
  //   experimental: {
  //     appDir: true,
  //   },
  //   ... 
  //   pages: {
  //     api: {
  //       auth: [
  //         {
  //           // ... your authentication routes
  //         },
  //       ],
  //     },
  //   },
  // ... 
  //   publicRuntimeConfig: {
  //     // ... your NextAuth.js settings
  //   },
  // ...
  //   // ... other configuration options
  // ...
  // See https://next-auth.js.org/getting-started/example for more detailed setup
  // Also check https://next-auth.js.org/configuration/api-routes for NextAuth.js API routes
  // ... 
};

/**
 * @description Configures Sentry for error tracking and performance monitoring.
 * @type {import('@sentry/nextjs').SentryConfig}
 */
const sentryConfig = {
  silent: !!process.env.SENTRY_SILENT,
  // Set the release to match the build version defined in your package.json
  // See https://docs.sentry.io/product/releases/
  release: process.env.NEXT_PUBLIC_RELEASE,
  // Include any other Sentry config options you might need
  // See https://docs.sentry.io/product/releases/
  // ...
};

module.exports = withNextAuth(
  withSentryConfig(nextConfig, sentryConfig),
  // ... your NextAuth.js configuration options
);