"use client";

import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "zustand";
import useForm from "../../../../src/presentation/hooks/useForm";
import { FormField } from "../../../../src/presentation/components/molecules/FormField";
import { Input } from "../../../../src/presentation/components/atoms/Input";
import { Button } from "../../../../src/presentation/components/atoms/Button";
import { Typography } from "../../../../src/presentation/components/atoms/Typography";
import { useStore } from "../../../../src/presentation/hooks/useStore";
import * as yup from "yup"; // Version 1.0.1 for form validation

// Mock the useStore hook for testing
jest.mock("../../../../src/presentation/hooks/useStore", () => ({
  ...jest.requireActual("../../../../src/presentation/hooks/useStore"),
  useStore: () => ({
    goals: [],
    workouts: [],
  }),
}));

describe("useForm", () => {
  it("should render a form with initial values and validation", () => {
    const initialValues = {
      email: "",
      password: "",
    };

    const validationSchema = yup.object().shape({
      email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
      password: yup.string().required("Password is required"),
    });

    render(
      <Provider store={useStore}>
        <Form
          initialValues={initialValues}
          validationSchema={validationSchema}
        />
      </Provider>
    );

    // Assertions for form elements and initial values
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /Email/i })).toHaveValue("");
    expect(screen.getByRole("textbox", { name: /Password/i })).toHaveValue("");
  });

  it("should handle input changes and update form values", () => {
    const initialValues = {
      email: "",
      password: "",
    };

    const validationSchema = yup.object().shape({
      email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
      password: yup.string().required("Password is required"),
    });

    render(
      <Provider store={useStore}>
        <Form
          initialValues={initialValues}
          validationSchema={validationSchema}
        />
      </Provider>
    );

    const emailInput = screen.getByRole("textbox", { name: /Email/i });
    const passwordInput = screen.getByRole("textbox", { name: /Password/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  it("should display validation errors when input is invalid", async () => {
    const initialValues = {
      email: "",
      password: "",
    };

    const validationSchema = yup.object().shape({
      email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
      password: yup.string().required("Password is required"),
    });

    render(
      <Provider store={useStore}>
        <Form
          initialValues={initialValues}
          validationSchema={validationSchema}
        />
      </Provider>
    );

    const emailInput = screen.getByRole("textbox", { name: /Email/i });
    const passwordInput = screen.getByRole("textbox", { name: /Password/i });

    fireEvent.blur(emailInput); // Trigger validation on blur

    await screen.findByText("Email is required");
    expect(screen.getByText("Email is required")).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.blur(emailInput); // Trigger validation on blur

    await screen.findByText("Invalid email format");
    expect(screen.getByText("Invalid email format")).toBeInTheDocument();
  });

  it("should handle form submission and display success message", async () => {
    const initialValues = {
      email: "",
      password: "",
    };

    const validationSchema = yup.object().shape({
      email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
      password: yup.string().required("Password is required"),
    });

    // Mock API call
    const mockSubmit = jest.fn();
    const mockResetForm = jest.fn();

    render(
      <Provider store={useStore}>
        <Form
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={mockSubmit}
          resetForm={mockResetForm}
        />
      </Provider>
    );

    const emailInput = screen.getByRole("textbox", { name: /Email/i });
    const passwordInput = screen.getByRole("textbox", { name: /Password/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.submit(screen.getByRole("form"));

    // Expect form to submit and display a success message
    expect(mockSubmit).toHaveBeenCalled();
    expect(mockResetForm).toHaveBeenCalled();
    await screen.findByText("Form submitted successfully!");
    expect(screen.getByText("Form submitted successfully!")).toBeInTheDocument();
  });
});

const Form = ({ initialValues, validationSchema, onSubmit, resetForm }: any) => {
  const {
    values,
    errors,
    isSubmitting,
    handleSubmit,
    handleChange,
    handleBlur,
    resetForm,
  } = useForm(initialValues, validationSchema);

  return (
    <form onSubmit={handleSubmit}>
      <FormField label="Email">
        <Input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors?.email && (
          <Typography variant="error" className="text-red-500 mt-1">
            {errors.email}
          </Typography>
        )}
      </FormField>

      <FormField label="Password">
        <Input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors?.password && (
          <Typography variant="error" className="text-red-500 mt-1">
            {errors.password}
          </Typography>
        )}
      </FormField>

      {errors?.general && (
        <Typography variant="error" className="text-red-500 mt-1">
          {errors.general}
        </Typography>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </Button>

      {isSubmitting && (
        <Typography variant="p" className="text-gray-500 mt-2">
          Submitting...
        </Typography>
      )}
    </form>
  );
};