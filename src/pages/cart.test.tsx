import { render, screen, fireEvent } from "@testing-library/react";
import { useCart } from "@/context/CartContext";
import CartPage from "./cart";
import "@testing-library/jest-dom";

import React from "react";
jest.mock("@/context/CartContext", () => ({
  useCart: jest.fn(),
}));

jest.mock("@/hooks/useMobile", () => jest.fn(() => false));

describe("CartPage Component", () => {
  const mockRemoveFromCart = jest.fn();
  const mockUpdateQuantity = jest.fn();

  const mockCart = [
    {
      id: "1",
      title: "Test Product",
      price: 20,
      quantity: 2,
      image: "/test-image.jpg",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useCart as jest.Mock).mockReturnValue({
      cart: mockCart,
      removeFromCart: mockRemoveFromCart,
      updateQuantity: mockUpdateQuantity,
      totalPrice: 40,
    });
  });

  test("renders Shopping Cart title", () => {
    render(<CartPage />);
    expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
  });

  test("displays cart items correctly", () => {
    render(<CartPage />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$40.00")).toBeInTheDocument();
  });

  test("increments and decrements item quantity", () => {
    render(<CartPage />);

    const minusButton = screen.getByText("-");
    const plusButton = screen.getByText("+");

    fireEvent.click(plusButton);
    expect(mockUpdateQuantity).toHaveBeenCalledWith("1", 3);

    fireEvent.click(minusButton);
    expect(mockUpdateQuantity).toHaveBeenCalledWith("1", 1);
  });

  test("removes item from cart when delete button is clicked", () => {
    render(<CartPage />);

    const deleteButton = screen.getByTestId("delete-button");

    fireEvent.click(deleteButton);
    expect(mockRemoveFromCart).toHaveBeenCalledWith("1");
  });

  test("displays total price correctly", () => {
    render(<CartPage />);
    expect(screen.getByText("Total: $40.00")).toBeInTheDocument();
  });
});
