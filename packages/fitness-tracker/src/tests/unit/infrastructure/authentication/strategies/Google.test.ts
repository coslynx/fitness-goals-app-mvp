import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { Session } from "next-auth"; // Version 4.24.8 - For seamless authentication and session management
import GoogleProvider from "next-auth/providers/google"; // Version 4.24.8 - For integrating Google OAuth
import { User } from "../../../../../src/domain/users/entities/User"; // Import the User entity
import { CreateUser } from "../../../../../src/domain/users/usecases/CreateUser"; // Import the CreateUser use case
import { UserRepository } from "../../../../../src/domain/users/repositories/UserRepository"; // Import the UserRepository
import { PrismaClient } from "@prisma/client"; // Version 5.20.0 - For interacting with the Prisma database
import bcrypt from "bcryptjs"; // For password hashing

const prisma = new PrismaClient();

describe("Google Authentication Strategy", () => {
  it("should successfully authenticate with Google", async () => {
    const mockGoogleProfile = {
      id: "google-user-id",
      email: "test@google.com",
      name: "Test User",
      // ... other Google profile data
    };

    const mockGoogleToken = {
      accessToken: "google-access-token",
      // ... other Google token data
    };

    jest
      .spyOn(GoogleProvider, "profile")
      .mockResolvedValue(mockGoogleProfile);

    const session = await NextAuth.session({
      req: {
        headers: {
          cookie: `next-auth.session-token=google-session-token`,
        },
      } as NextApiRequest,
      // ... other session options
    });

    expect(GoogleProvider.profile).toHaveBeenCalledWith(
      mockGoogleToken,
      // ... other profile options
    );

    expect(session?.user.id).toBe(mockGoogleProfile.id);
    expect(session?.user.email).toBe(mockGoogleProfile.email);
    expect(session?.user.name).toBe(mockGoogleProfile.name);
  });

  it("should create a new user if the user doesn't exist", async () => {
    const mockGoogleProfile = {
      id: "google-user-id",
      email: "test@google.com",
      name: "Test User",
      // ... other Google profile data
    };

    const mockGoogleToken = {
      accessToken: "google-access-token",
      // ... other Google token data
    };

    jest
      .spyOn(GoogleProvider, "profile")
      .mockResolvedValue(mockGoogleProfile);

    const userExists = await prisma.user.findUnique({
      where: {
        email: mockGoogleProfile.email,
      },
    });

    expect(userExists).toBeNull(); // Ensure the user doesn't exist in the database

    const session = await NextAuth.session({
      req: {
        headers: {
          cookie: `next-auth.session-token=google-session-token`,
        },
      } as NextApiRequest,
      // ... other session options
    });

    expect(session?.user.id).toBe(mockGoogleProfile.id);
    expect(session?.user.email).toBe(mockGoogleProfile.email);
    expect(session?.user.name).toBe(mockGoogleProfile.name);

    // Check if the user was created in the database
    const newUser = await prisma.user.findUnique({
      where: {
        email: mockGoogleProfile.email,
      },
    });

    expect(newUser?.id).toBe("google-user-id");
    expect(newUser?.email).toBe("test@google.com");
    expect(newUser?.name).toBe("Test User");
  });

  it("should hash the user's password if the user is created", async () => {
    const mockGoogleProfile = {
      id: "google-user-id",
      email: "test@google.com",
      name: "Test User",
      // ... other Google profile data
    };

    const mockGoogleToken = {
      accessToken: "google-access-token",
      // ... other Google token data
    };

    jest
      .spyOn(GoogleProvider, "profile")
      .mockResolvedValue(mockGoogleProfile);

    const userExists = await prisma.user.findUnique({
      where: {
        email: mockGoogleProfile.email,
      },
    });

    expect(userExists).toBeNull(); // Ensure the user doesn't exist in the database

    const session = await NextAuth.session({
      req: {
        headers: {
          cookie: `next-auth.session-token=google-session-token`,
        },
      } as NextApiRequest,
      // ... other session options
    });

    // Check if the user's password was hashed
    const newUser = await prisma.user.findUnique({
      where: {
        email: mockGoogleProfile.email,
      },
    });

    expect(newUser?.password).not.toBe("testPassword123"); // Assert that the password is not stored in plain text

    const isPasswordHashed = await bcrypt.compare(
      "testPassword123", // Compare the original password
      newUser?.password ?? "" // ... with the stored password
    );

    expect(isPasswordHashed).toBe(true); // Confirm that the stored password is hashed
  });

  it("should handle errors during Google authentication", async () => {
    const mockGoogleError = new Error("Google authentication failed");

    jest
      .spyOn(GoogleProvider, "profile")
      .mockRejectedValue(mockGoogleError);

    const session = await NextAuth.session({
      req: {
        headers: {
          cookie: `next-auth.session-token=google-session-token`,
        },
      } as NextApiRequest,
      // ... other session options
    });

    expect(session).toBeNull(); // Ensure the session is null in case of an error
  });
});