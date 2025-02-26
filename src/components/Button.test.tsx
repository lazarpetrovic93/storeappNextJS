import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@/components/Button";

describe("Button Component", () => {
  it("renders button with children text", () => {
    render(<Button onClick={() => {}}>Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByText("Click Me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("shows loading spinner when isLoading is true", () => {
    render(
      <Button onClick={() => {}} isLoading>
        Loading
      </Button>
    );
    expect(screen.queryByText("Loading")).not.toBeInTheDocument();
  });

  it("disables button when disabled prop is true", () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>
    );
    const button = screen.getByText("Disabled");
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies correct variant class", () => {
    const { rerender } = render(
      <Button onClick={() => {}} variant="primary">
        Primary
      </Button>
    );
    expect(screen.getByText("Primary")).toHaveClass("bg-primary");

    rerender(
      <Button onClick={() => {}} variant="secondary">
        Secondary
      </Button>
    );
    expect(screen.getByText("Secondary")).toHaveClass("bg-gray-500");

    rerender(
      <Button onClick={() => {}} variant="danger">
        Danger
      </Button>
    );
    expect(screen.getByText("Danger")).toHaveClass("bg-red-500");
  });
});
