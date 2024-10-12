import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

/**
 * @file packages/fitness-tracker/src/infrastructure/authentication/strategies/Google.ts
 * @description Implements Google OAuth authentication strategy for user login.
 * @author CosLynxAI
 */

export default GoogleProvider({
  clientId: process.env.NEXTAUTH_PROVIDER_GOOGLE_CLIENT_ID!,
  clientSecret: process.env.NEXTAUTH_PROVIDER_GOOGLE_CLIENT_SECRET!,
  // ... other GoogleProvider configuration options if needed
});