import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CartPage from "@/pages/cart";
import { useCart } from "@/context/CartContext";
import "@testing-library/jest-dom";

// Mock cart items
const mockCart = [
  {
    id: 1,
    title: "Test Product",
    price: 10,
    quantity: 1,
    image: "https://example.com/image.jpg",
  },
];

// Mock cart context functions
const mockRemoveFromCart = jest.fn();
const mockUpdateQuantity = jest.fn();

jest.mock("@/context/CartContext", () => ({
  useCart: jest.fn(),
}));

describe("cart", () => {
  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({
      cart: mockCart,
      removeFromCart: mockRemoveFromCart,
      updateQuantity: mockUpdateQuantity,
      totalPrice: 10,
    });
  });

  it("renders the cart page", () => {
    render(<CartPage />);
    expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
  });

  it("displays cart items", () => {
    render(<CartPage />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$10.00")).toBeInTheDocument();
  });

  it("calls removeFromCart when the delete button is clicked", () => {
    render(<CartPage />);
    const deleteButton = screen.getByTestId("delete-button");
    fireEvent.click(deleteButton);
    expect(mockRemoveFromCart).toHaveBeenCalledWith(1);
  });

  it("increases item quantity when the + button is clicked", () => {
    render(<CartPage />);
    const plusButton = screen.getByText("+");
    fireEvent.click(plusButton);
    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 2);
  });

  it("decreases item quantity when the - button is clicked", () => {
    render(<CartPage />);
    const minusButton = screen.getByText("-");
    fireEvent.click(minusButton);
    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 2);
  });

  it("displays the total price correctly", () => {
    render(<CartPage />);
    expect(screen.getByText("Total: $10.00")).toBeInTheDocument();
  });

  it("updates input quantity when manually changed", async () => {
    render(<CartPage />);
    const input = screen.getByTestId("quantity-input");
    fireEvent.change(input, { target: { value: "3" } });
    await waitFor(() => expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 3));
  });
});
