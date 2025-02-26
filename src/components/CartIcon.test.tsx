import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CartIcon from "./CartIcon";
import { useCart } from "../context/CartContext";
import "@testing-library/jest-dom";

jest.mock("../context/CartContext", () => ({
  useCart: jest.fn(),
}));

describe("CartIcon Component", () => {
  it("renders cart icon", () => {
    (useCart as jest.Mock).mockReturnValue({ cart: [] });
    render(<CartIcon />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/cart");
  });

  it("shows the correct number of items in the cart", () => {
    (useCart as jest.Mock).mockReturnValue({
      cart: [{ id: 1 }, { id: 2 }, { id: 3 }],
    });
    render(<CartIcon />);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("does not show the badge when cart is empty", () => {
    (useCart as jest.Mock).mockReturnValue({ cart: [] });
    render(<CartIcon />);
    expect(screen.queryByText(/[0-9]+/)).not.toBeInTheDocument();
  });
});
