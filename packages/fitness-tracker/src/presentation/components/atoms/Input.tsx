"use client";

import { useState, useEffect } from "react";

interface InputProps {
  /** The type of the input element (e.g., "text", "email", "password"). */
  type: string;
  /** The value of the input element. */
  value: string;
  /** The function to call when the input value changes. */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Whether the input element is required. */
  required?: boolean;
  /** Additional CSS classes to apply to the input element. */
  className?: string;
  /** The placeholder text for the input element. */
  placeholder?: string;
  /** The label text for the input element. */
  label?: string;
  /** Whether to display the input as a textarea. */
  asTextarea?: boolean;
}

/**
 * @file packages/fitness-tracker/src/presentation/components/atoms/Input.tsx
 * @description A reusable input component for forms.
 * @author CosLynxAI
 */
export default function Input({
  type,
  value,
  onChange,
  required,
  className,
  placeholder,
  label,
  asTextarea,
}: InputProps) {
  const [focused, setFocused] = useState(false);

  // Handle focus and blur events to manage the focused state
  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  return (
    <div className={`relative ${className || ""}`}>
      {/* Display the label if provided */}
      {label && (
        <label
          htmlFor={label}
          className={`absolute left-2 top-2 text-sm text-gray-600 transition-opacity duration-150 ${
            focused ? "opacity-100" : "opacity-0"
          }`}
        >
          {label}
        </label>
      )}
      {/* Render the input element as either an input or textarea */}
      {asTextarea ? (
        <textarea
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            focused ? "border-blue-500 focus:border-blue-500" : ""
          }`}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            focused ? "border-blue-500 focus:border-blue-500" : ""
          }`}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      )}
    </div>
  );
}