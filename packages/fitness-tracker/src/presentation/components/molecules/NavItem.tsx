"use client";

import { Link } from "next/link";
import { Typography } from "@/presentation/components/atoms/Typography";
import { NavItemProps } from "@/presentation/types/NavItem";

/**
 * @file packages/fitness-tracker/src/presentation/components/molecules/NavItem.tsx
 * @description Implements a reusable navigation item component for the application's header and sidebar.
 * @author CosLynxAI
 */

/**
 * @description A reusable navigation item component, displaying a link with optional icon and text.
 * @param {NavItemProps} props The component's properties.
 * @returns {JSX.Element} The rendered navigation item element.
 */
export default function NavItem({ href, text, icon }: NavItemProps) {
  return (
    <Link href={href} className="flex items-center py-2 px-4 rounded-md hover:bg-gray-100">
      {icon && (
        <span className="mr-2">
          {icon}
        </span>
      )}
      {text && (
        <Typography variant="span" className="text-gray-900 font-medium">
          {text}
        </Typography>
      )}
    </Link>
  );
}