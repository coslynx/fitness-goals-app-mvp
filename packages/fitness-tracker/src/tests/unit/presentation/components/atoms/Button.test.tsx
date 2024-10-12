"use client";

import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../../../../../../src/presentation/components/atoms/Button";

describe("Button", () => {
  it("should render the button with correct text", () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveTextContent("Click Me");
  });

  it("should render the button with correct type", () => {
    render(<Button type="submit">Submit</Button>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveAttribute("type", "submit");
  });

  it("should render the button with correct class name", () => {
    render(<Button className="custom-button">Click Me</Button>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveClass("custom-button");
  });

  it("should render the button as disabled", () => {
    render(<Button disabled>Click Me</Button>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeDisabled();
  });

  it("should call onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalled();
  });
});