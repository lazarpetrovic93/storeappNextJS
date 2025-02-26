import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CartPage from "@/pages/cart";
import { useCart } from "@/context/CartContext";
import "@testing-library/jest-dom";

jest.mock("@/context/CartContext", () => ({
  useCart: jest.fn(),
}));

describe("Cart Page", () => {
  const mockCart = [
    { id: 1, title: "Product 1", price: 20, image: "img1.jpg", quantity: 2 },
    { id: 2, title: "Product 2", price: 15, image: "img2.jpg", quantity: 1 },
  ];

  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({
      cart: mockCart,
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
      totalPrice: 50,
    });
  });

  it("calls `updateQuantity` when clicking plus button", () => {
    const mockUpdateQuantity = jest.fn();
    (useCart as jest.Mock).mockReturnValue({
      cart: mockCart,
      removeFromCart: jest.fn(),
      updateQuantity: mockUpdateQuantity,
      totalPrice: 50,
    });

    render(<CartPage />);

    const plusButtons = screen.getAllByRole("button", { name: "+" });
    fireEvent.click(plusButtons[0]);

    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 3);
  });

  it("calls `updateQuantity` when clicking minus button", () => {
    const mockUpdateQuantity = jest.fn();
    (useCart as jest.Mock).mockReturnValue({
      cart: mockCart,
      removeFromCart: jest.fn(),
      updateQuantity: mockUpdateQuantity,
      totalPrice: 50,
    });

    render(<CartPage />);

    const minusButtons = screen.getAllByRole("button", { name: "-" });
    fireEvent.click(minusButtons[0]);

    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 1);
  });

  it("calls `removeFromCart` when clicking minus button at quantity 1", () => {
    const mockRemoveFromCart = jest.fn();
    const mockUpdateQuantity = jest.fn();

    (useCart as jest.Mock).mockReturnValue({
      cart: mockCart,
      removeFromCart: mockRemoveFromCart,
      updateQuantity: mockUpdateQuantity,
      totalPrice: 50,
    });

    render(<CartPage />);

    const minusButtons = screen.getAllByRole("button", { name: "-" });
    fireEvent.click(minusButtons[1]);
    expect(mockRemoveFromCart).toHaveBeenCalledWith(2);
  });

  it("calls `removeFromCart` when clicking the trash button", () => {
    const mockRemoveFromCart = jest.fn();
    (useCart as jest.Mock).mockReturnValue({
      cart: mockCart,
      removeFromCart: mockRemoveFromCart,
      updateQuantity: jest.fn(),
      totalPrice: 50,
    });

    render(<CartPage />);

    const trashButtons = screen.getAllByTestId("delete-button");
    fireEvent.click(trashButtons[0]);
    expect(mockRemoveFromCart).toHaveBeenCalledWith(1);
  });
  it("calls `updateQuantity` when changing the input value", () => {
    const mockUpdateQuantity = jest.fn();
    (useCart as jest.Mock).mockReturnValue({
      cart: mockCart,
      removeFromCart: jest.fn(),
      updateQuantity: mockUpdateQuantity,
      totalPrice: 50,
    });

    render(<CartPage />);

    const quantityInputs = screen.getAllByTestId("quantity-input");

    fireEvent.change(quantityInputs[0], { target: { value: "3" } });

    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 3);
  });
});
