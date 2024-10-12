import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { Session } from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import { User } from "../../../../../src/domain/users/entities/User";
import { CreateUser } from "../../../../../src/domain/users/usecases/CreateUser";
import { UserRepository } from "../../../../../src/domain/users/repositories/UserRepository";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

describe("Facebook Authentication Strategy", () => {
  it("should successfully authenticate with Facebook", async () => {
    const mockFacebookProfile = {
      id: "facebook-user-id",
      email: "test@facebook.com",
      name: "Test User",
      // ... other Facebook profile data
    };

    const mockFacebookToken = {
      accessToken: "facebook-access-token",
      // ... other Facebook token data
    };

    jest.spyOn(FacebookProvider, "profile").mockResolvedValue(mockFacebookProfile);

    const session = await NextAuth.session({
      req: {
        headers: {
          cookie: `next-auth.session-token=facebook-session-token`,
        },
      } as NextApiRequest,
      // ... other session options
    });

    expect(FacebookProvider.profile).toHaveBeenCalledWith(
      mockFacebookToken,
      // ... other profile options
    );

    expect(session?.user.id).toBe(mockFacebookProfile.id);
    expect(session?.user.email).toBe(mockFacebookProfile.email);
    expect(session?.user.name).toBe(mockFacebookProfile.name);
  });

  it("should create a new user if the user doesn't exist", async () => {
    const mockFacebookProfile = {
      id: "facebook-user-id",
      email: "test@facebook.com",
      name: "Test User",
      // ... other Facebook profile data
    };

    const mockFacebookToken = {
      accessToken: "facebook-access-token",
      // ... other Facebook token data
    };

    jest.spyOn(FacebookProvider, "profile").mockResolvedValue(mockFacebookProfile);

    const userExists = await prisma.user.findUnique({
      where: {
        email: mockFacebookProfile.email,
      },
    });

    expect(userExists).toBeNull(); // Ensure the user doesn't exist in the database

    const session = await NextAuth.session({
      req: {
        headers: {
          cookie: `next-auth.session-token=facebook-session-token`,
        },
      } as NextApiRequest,
      // ... other session options
    });

    expect(session?.user.id).toBe(mockFacebookProfile.id);
    expect(session?.user.email).toBe(mockFacebookProfile.email);
    expect(session?.user.name).toBe(mockFacebookProfile.name);

    // Check if the user was created in the database
    const newUser = await prisma.user.findUnique({
      where: {
        email: mockFacebookProfile.email,
      },
    });

    expect(newUser?.id).toBe("facebook-user-id");
    expect(newUser?.email).toBe("test@facebook.com");
    expect(newUser?.name).toBe("Test User");
  });

  it("should hash the user's password if the user is created", async () => {
    const mockFacebookProfile = {
      id: "facebook-user-id",
      email: "test@facebook.com",
      name: "Test User",
      // ... other Facebook profile data
    };

    const mockFacebookToken = {
      accessToken: "facebook-access-token",
      // ... other Facebook token data
    };

    jest.spyOn(FacebookProvider, "profile").mockResolvedValue(mockFacebookProfile);

    const userExists = await prisma.user.findUnique({
      where: {
        email: mockFacebookProfile.email,
      },
    });

    expect(userExists).toBeNull(); // Ensure the user doesn't exist in the database

    const session = await NextAuth.session({
      req: {
        headers: {
          cookie: `next-auth.session-token=facebook-session-token`,
        },
      } as NextApiRequest,
      // ... other session options
    });

    // Check if the user's password was hashed
    const newUser = await prisma.user.findUnique({
      where: {
        email: mockFacebookProfile.email,
      },
    });

    expect(newUser?.password).not.toBe("testPassword123"); // Assert that the password is not stored in plain text

    const isPasswordHashed = await bcrypt.compare(
      "testPassword123", // Compare the original password
      newUser?.password ?? "" // ... with the stored password
    );

    expect(isPasswordHashed).toBe(true); // Confirm that the stored password is hashed
  });

  it("should handle errors during Facebook authentication", async () => {
    const mockFacebookError = new Error("Facebook authentication failed");

    jest.spyOn(FacebookProvider, "profile").mockRejectedValue(mockFacebookError);

    const session = await NextAuth.session({
      req: {
        headers: {
          cookie: `next-auth.session-token=facebook-session-token`,
        },
      } as NextApiRequest,
      // ... other session options
    });

    expect(session).toBeNull(); // Ensure the session is null in case of an error
  });
});