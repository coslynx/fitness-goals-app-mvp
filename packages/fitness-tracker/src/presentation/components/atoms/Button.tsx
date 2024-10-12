"use client";

import React from "react";

interface ButtonProps {
  /** The text to be displayed on the button. */
  children: React.ReactNode;
  /** The type of the button (e.g., "submit", "button"). */
  type?: "submit" | "button" | "reset";
  /** Additional CSS classes to apply to the button. */
  className?: string;
  /** Whether the button is disabled. */
  disabled?: boolean;
  /** The function to call when the button is clicked. */
  onClick?: () => void;
}

/**
 * @file packages/fitness-tracker/src/presentation/components/atoms/Button.tsx
 * @description A reusable button component for user interactions.
 * @author CosLynxAI
 */
export default function Button({
  children,
  type = "button",
  className,
  disabled,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className || ""}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}