"use client";

import { render, screen } from "@testing-library/react";
import FormField from "../../../../../src/presentation/components/molecules/FormField";
import { Input } from "../../../../../src/presentation/components/atoms/Input";
import { Typography } from "../../../../../src/presentation/components/atoms/Typography";

describe("FormField", () => {
  it("should render a FormField component with a label and child element", () => {
    render(
      <FormField label="Email">
        <Input type="email" value="" onChange={() => {}} />
      </FormField>
    );

    const labelElement = screen.getByText("Email");
    const inputElement = screen.getByRole("textbox");

    expect(labelElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
  });

  it("should render a FormField component with custom className", () => {
    render(
      <FormField label="Email" className="custom-form-field">
        <Input type="email" value="" onChange={() => {}} />
      </FormField>
    );

    const formFieldElement = screen.getByText("Email").parentElement;
    expect(formFieldElement).toHaveClass("custom-form-field");
  });

  it("should render a FormField component with custom children", () => {
    render(
      <FormField label="Password">
        <Typography variant="p" className="text-gray-500">
          Password
        </Typography>
      </FormField>
    );

    const labelElement = screen.getByText("Password");
    const textElement = screen.getByText("Password");

    expect(labelElement).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
  });
});