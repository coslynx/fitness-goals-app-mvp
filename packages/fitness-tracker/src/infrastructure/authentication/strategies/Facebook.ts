import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";

/**
 * @file packages/fitness-tracker/src/infrastructure/authentication/strategies/Facebook.ts
 * @description Implements Facebook OAuth authentication strategy for user login.
 * @author CosLynxAI
 */

export default FacebookProvider({
  clientId: process.env.NEXTAUTH_PROVIDER_FACEBOOK_APP_ID!,
  clientSecret: process.env.NEXTAUTH_PROVIDER_FACEBOOK_APP_SECRET!,
  // ... other FacebookProvider configuration options if needed
});