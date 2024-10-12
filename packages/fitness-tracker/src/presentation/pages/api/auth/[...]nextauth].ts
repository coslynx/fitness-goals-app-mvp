/**
 * @file packages/fitness-tracker/src/presentation/pages/api/auth/[...]nextauth].ts
 * @description Handles NextAuth.js configuration and routing for user authentication.
 * @author CosLynxAI
 */

import NextAuth from "next-auth"; // Version 4.24.8 - For seamless authentication and session management
import { NextApiRequest, NextApiResponse } from "next"; // Core Next.js modules for handling API requests and responses
import { Session } from "next-auth"; // Type definition for NextAuth.js session object
import GoogleProvider from "next-auth/providers/google"; // Version 4.24.8 - For integrating Google OAuth
import FacebookProvider from "next-auth/providers/facebook"; // Version 4.24.8 - For integrating Facebook OAuth
import { User } from "../../../../domain/users/entities/User"; // Import the User entity
import { CreateUser } from "../../../../domain/users/usecases/CreateUser"; // Import the CreateUser use case
import { UserRepository } from "../../../../domain/users/repositories/UserRepository"; // Import the UserRepository
import { PrismaClient } from "@prisma/client"; // Version 5.20.0 - For interacting with the Prisma database
import bcrypt from "bcryptjs"; // For password hashing

const prisma = new PrismaClient();

// This is the main function for handling NextAuth.js requests.
export default NextAuth({
  // Define the providers for user authentication. 
  //  - Google: uses Google OAuth for user login.
  //  - Facebook: uses Facebook OAuth for user login.
  providers: [
    GoogleProvider({
      clientId: process.env.NEXTAUTH_PROVIDER_GOOGLE_CLIENT_ID!, // Client ID for Google authentication.
      clientSecret: process.env.NEXTAUTH_PROVIDER_GOOGLE_CLIENT_SECRET!, // Client secret for Google authentication.
      // ... other GoogleProvider configuration options if needed
    }),
    FacebookProvider({
      clientId: process.env.NEXTAUTH_PROVIDER_FACEBOOK_APP_ID!, // App ID for Facebook authentication.
      clientSecret: process.env.NEXTAUTH_PROVIDER_FACEBOOK_APP_SECRET!, // App secret for Facebook authentication.
      // ... other FacebookProvider configuration options if needed
    }),
  ],
  // Optional callbacks for handling specific events during the authentication process.
  // For this MVP, we'll focus on the callbacks for session management, user registration, and error handling.
  callbacks: {
    // This callback is called when a user is successfully authenticated.
    // It should handle the creation of a user session.
    // For this MVP, we'll store the session data using the `session` object.
    session: async ({ session, token }: { session: Session; token: any }) => {
      // Retrieve the session data and user information.
      const { user } = session;

      // Check if the user exists in the database.
      let existingUser = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });

      // If the user doesn't exist, create a new user account in the database.
      //  - Pass the user information to the `CreateUser` use case.
      //  - Use `bcrypt` to hash the password before storing it.
      if (!existingUser) {
        const saltRounds = 10; // Number of rounds for password hashing.
        const hashedPassword = await bcrypt.hash(user.password!, saltRounds); // Hash the password.
        const newUser = new User({
          email: user.email, // Set the user's email.
          password: hashedPassword, // Store the hashed password.
        });

        // Use the `CreateUser` use case to create the new user in the database.
        //  - This ensures that user creation follows defined business rules.
        const createUserInstance = new CreateUser(new UserRepository());
        existingUser = await createUserInstance.execute(newUser);
      }

      // Add the user's ID to the session object, which will be used later for authorization.
      session.user.id = existingUser.id;

      // Return the updated session object.
      return session;
    },
    // This callback is called when a user attempts to register a new account.
    // For this MVP, we'll handle user registration here.
    //  - Ensure the user's email is not already registered.
    //  - Hash the password before saving it.
    //  - Use the `CreateUser` use case to create a new user in the database.
    async redirect(): Promise<string | null> {
      // The callback for redirecting the user after successful registration.
      return "/";
    },
    // This callback is called when an error occurs during the authentication process.
    //  - Log the error to Sentry or another logging service for debugging.
    //  - Provide a user-friendly error message to the frontend.
    async error(): Promise<string | null> {
      // The callback for handling authentication errors.
      return "/";
    },
  },
  // These settings control the behavior of NextAuth.js.
  //  - site: The URL of your Next.js application, used for authentication callbacks.
  //  - secret: A secret key for signing JWT tokens.
  settings: {
    site: process.env.NEXTAUTH_URL!, // Get the application URL from environment variables.
    secret: process.env.NEXTAUTH_SECRET!, // Get the secret key from environment variables.
  },
});