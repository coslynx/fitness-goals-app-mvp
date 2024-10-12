"use client";

import { useState } from "react";
import { Typography } from "@/presentation/components/atoms/Typography";
import { Input } from "@/presentation/components/atoms/Input";

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
}

/**
 * @file packages/fitness-tracker/src/presentation/components/molecules/FormField.tsx
 * @description A reusable form field component that combines a label and an input element.
 * @author CosLynxAI
 */
export default function FormField({ label, children }: FormFieldProps) {
  return (
    <div className="mb-4">
      <Typography variant="label" className="block text-gray-700 font-bold mb-2">
        {label}
      </Typography>
      {children}
    </div>
  );
}