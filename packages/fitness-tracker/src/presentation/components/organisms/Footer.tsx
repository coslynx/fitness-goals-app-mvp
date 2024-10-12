"use client";

import { useSession } from "next-auth/react"; // v4.24.8 - For accessing user session data
import { useRouter } from "next/navigation"; // For client-side routing
import { useStore } from "@/presentation/hooks/useStore"; // For accessing global state using Zustand
import { NavItem } from "@/presentation/components/molecules/NavItem"; // For creating navigation items
import { Typography } from "@/presentation/components/atoms/Typography"; // For displaying text

/**
 * @file packages/fitness-tracker/src/presentation/components/organisms/Footer.tsx
 * @description Implements the footer component for the fitness tracker application, displaying copyright information, navigation links, and potential social media links.
 * @author CosLynxAI
 */

interface FooterProps {
  /** Additional CSS classes to apply to the footer element. */
  className?: string;
}

/**
 * @description Renders the footer component, providing copyright information, navigation links, and optional social media links.
 * @param {FooterProps} props The component's properties.
 * @returns {JSX.Element} The rendered footer element.
 */
export default function Footer({ className }: FooterProps) {
  const { data: session, status } = useSession(); // Access the user session data
  const router = useRouter(); // Create a router instance for client-side navigation
  const { goals, workouts } = useStore(); // Access the global state using Zustand

  // Handle the click event for the footer navigation items
  //  - When a link is clicked:
  //    - Update the current route using the router instance.
  const handleClick = (href: string) => {
    router.push(href);
  };

  // Conditional rendering for the footer navigation items
  //  - Display different navigation items based on the authentication status.
  //    - If authenticated, display:
  //      - Dashboard
  //      - Goals
  //      - Workouts
  //      - Profile
  //      - Settings
  //    - If not authenticated, display:
  //      - Login
  //      - Register
  return (
    <footer className={`bg-gray-800 text-white py-4 mt-auto ${className || ""}`}>
      <div className="container mx-auto flex flex-col items-center justify-between">
        {/* Copyright information */}
        <Typography variant="p" className="text-center">
          &copy; {new Date().getFullYear()} Track Your Fitness Goals Easily Now.
        </Typography>

        {/* Navigation links */}
        <ul className="flex mt-4">
          {status === "authenticated" ? (
            <>
              <NavItem
                href="/dashboard"
                text="Dashboard"
                icon={null}
                onClick={() => handleClick("/dashboard")}
              />
              <NavItem
                href="/goals"
                text="Goals"
                icon={null}
                onClick={() => handleClick("/goals")}
              />
              <NavItem
                href="/workouts"
                text="Workouts"
                icon={null}
                onClick={() => handleClick("/workouts")}
              />
              <NavItem
                href="/profile"
                text="Profile"
                icon={null}
                onClick={() => handleClick("/profile")}
              />
              <NavItem
                href="/settings"
                text="Settings"
                icon={null}
                onClick={() => handleClick("/settings")}
              />
            </>
          ) : (
            <>
              <NavItem
                href="/auth/login"
                text="Login"
                icon={null}
                onClick={() => handleClick("/auth/login")}
              />
              <NavItem
                href="/auth/register"
                text="Register"
                icon={null}
                onClick={() => handleClick("/auth/register")}
              />
            </>
          )}
        </ul>

        {/* Optional social media links */}
        {/* <div className="flex mt-4">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="ml-2 text-lg">
              <FontAwesomeIcon icon={faFacebook} />
            </span>
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="ml-2 text-lg">
              <FontAwesomeIcon icon={faTwitter} />
            </span>
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="ml-2 text-lg">
              <FontAwesomeIcon icon={faInstagram} />
            </span>
          </a>
        </div> */}
      </div>
    </footer>
  );
}