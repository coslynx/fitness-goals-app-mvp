"use client";

import { useState } from "react";
import { useStore } from "@/presentation/hooks/useStore";

/**
 * @file packages/fitness-tracker/src/presentation/hooks/useForm.ts
 * @description Custom hook for managing form state and validation.
 * @author CosLynxAI
 */

interface FormState<T> {
  values: T;
  errors: { [key: string]: string } | null;
  isSubmitting: boolean;
  isValidating: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  resetForm: () => void;
}

/**
 * @description Custom hook for managing form state and validation.
 * @param {object} initialValues The initial values for the form.
 * @param {object} validationSchema The validation schema for the form.
 * @returns {object} An object containing the form state, validation errors, and handlers.
 */
export default function useForm<T>(initialValues: T, validationSchema: any): FormState<T> {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<{ [key: string]: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const { goals, workouts } = useStore();

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors(null);

    try {
      // Validate the form data using the validation schema
      const validationResult = await validationSchema.validate(values, { abortEarly: false });

      // If validation fails, update the errors state
      if (validationResult.errors.length) {
        setErrors(
          validationResult.errors.reduce((acc, err) => ({ ...acc, [err.path]: err.message }), {})
        );
        setIsSubmitting(false);
        return;
      }

      // Submit the form data to the API
      // ... (API call implementation using axios or fetch)

      // Reset the form state
      resetForm();
    } catch (error) {
      // Handle potential errors during validation or submission
      if (error instanceof Error) {
        setErrors({ ...errors, general: error.message });
      } else {
        setErrors({ ...errors, general: "An error occurred. Please try again later." });
      }
      setIsSubmitting(false);
    }
  };

  // Function to handle input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  // Function to handle input blur events
  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = event.target;
    setIsValidating(true);

    // Validate the specific input field using the validation schema
    validationSchema
      .validateAt(name, values, { abortEarly: false })
      .then((result) => {
        if (result.errors.length) {
          setErrors((prevErrors) => ({ ...prevErrors, [name]: result.errors[0].message }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
        }
        setIsValidating(false);
      })
      .catch((error) => {
        if (error instanceof Error) {
          setErrors((prevErrors) => ({ ...prevErrors, [name]: error.message }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, [name]: "An error occurred. Please try again later." }));
        }
        setIsValidating(false);
      });
  };

  // Function to reset the form state
  const resetForm = () => {
    setValues(initialValues);
    setErrors(null);
    setIsSubmitting(false);
    setIsValidating(false);
  };

  return {
    values,
    errors,
    isSubmitting,
    isValidating,
    handleSubmit,
    handleChange,
    handleBlur,
    resetForm,
  };
}