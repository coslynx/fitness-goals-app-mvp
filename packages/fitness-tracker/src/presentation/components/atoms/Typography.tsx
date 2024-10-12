"use client";

import { useState } from "react";
import { useStore } from "@/presentation/hooks/useStore"; // For accessing global state using Zustand

/**
 * @file packages/fitness-tracker/src/presentation/components/atoms/Typography.tsx
 * @description Implements a reusable typography component for displaying text in different styles and sizes.
 * @author CosLynxAI
 */

interface TypographyProps {
  /** The variant of the typography, controlling the font size and style. */
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "code";
  /** Additional CSS classes to apply to the typography element. */
  className?: string;
  /** The text content to be displayed. */
  children: React.ReactNode;
}

/**
 * @description A reusable component for displaying text in various styles and sizes.
 * @param {TypographyProps} props The component's properties.
 * @returns {JSX.Element} The rendered typography element.
 */
export default function Typography({ variant, className, children }: TypographyProps) {
  // Access the global state from the Zustand store
  const { goals, workouts } = useStore();

  // Map typography variants to CSS classes
  const variantMap = {
    h1: "text-4xl font-bold text-gray-800 mb-4",
    h2: "text-3xl font-bold text-gray-800 mb-4",
    h3: "text-2xl font-bold text-gray-800 mb-4",
    h4: "text-xl font-bold text-gray-800 mb-4",
    h5: "text-lg font-bold text-gray-800 mb-4",
    h6: "text-base font-bold text-gray-800 mb-4",
    p: "text-base text-gray-600 mb-4",
    span: "text-base text-gray-600",
    code: "text-sm font-mono text-gray-900 bg-gray-100 p-2 rounded",
  };

  // Combine variant-specific CSS classes with user-provided classes
  const classes = `${variantMap[variant]} ${className || ""}`;

  return (
    <div className={classes}>
      {children}
    </div>
  );
}