"use client";

import { render, screen } from "@testing-library/react";
import NavItem from "../../../../../src/presentation/components/molecules/NavItem";
import { NavItemProps } from "../../../../../src/presentation/types/NavItem";
import { Typography } from "../../../../../src/presentation/components/atoms/Typography";
import { Link } from "next/link";

describe("NavItem", () => {
  it("should render a NavItem component with text and href", () => {
    const href = "/dashboard";
    const text = "Dashboard";

    render(
      <NavItem href={href} text={text} icon={null}>
        <Typography variant="span" className="text-gray-900 font-medium">
          {text}
        </Typography>
      </NavItem>
    );

    const navItemElement = screen.getByRole("link");
    expect(navItemElement).toHaveAttribute("href", href);
    expect(navItemElement).toHaveTextContent(text);
  });

  it("should render a NavItem component with icon and href", () => {
    const href = "/goals";
    const icon = <span className="mr-2">{/* Your Icon Component */}</span>;
    const text = "Goals";

    render(
      <NavItem href={href} text={text} icon={icon}>
        <Typography variant="span" className="text-gray-900 font-medium">
          {text}
        </Typography>
      </NavItem>
    );

    const navItemElement = screen.getByRole("link");
    expect(navItemElement).toHaveAttribute("href", href);
    expect(navItemElement).toContainElement(icon);
  });

  it("should render a NavItem component with text, icon, and href", () => {
    const href = "/workouts";
    const icon = <span className="mr-2">{/* Your Icon Component */}</span>;
    const text = "Workouts";

    render(
      <NavItem href={href} text={text} icon={icon}>
        <Typography variant="span" className="text-gray-900 font-medium">
          {text}
        </Typography>
      </NavItem>
    );

    const navItemElement = screen.getByRole("link");
    expect(navItemElement).toHaveAttribute("href", href);
    expect(navItemElement).toContainElement(icon);
    expect(navItemElement).toHaveTextContent(text);
  });
});