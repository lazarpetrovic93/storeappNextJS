import { renderHook, act } from "@testing-library/react";
import React, { ReactNode } from "react";
import { CartProvider, useCart, cartReducer, CartItem } from "./CartContext";

beforeEach(() => {
  Storage.prototype.getItem = jest.fn(() => null);
  Storage.prototype.setItem = jest.fn();
});

describe("cartReducer", () => {
  it("should add an item to the cart", () => {
    const initialState = { cart: [] };
    const newItem: CartItem = {
      id: 1,
      title: "Product 1",
      price: 10,
      image: "image-url",
      quantity: 1,
    };

    const newState = cartReducer(initialState, {
      type: "ADD_TO_CART",
      payload: newItem,
    });

    expect(newState.cart).toHaveLength(1);
    expect(newState.cart[0]).toEqual({ ...newItem, quantity: 1 });
  });

  it("should increase quantity if item already exists", () => {
    const initialState = {
      cart: [
        {
          id: 1,
          title: "Product 1",
          price: 10,
          image: "image-url",
          quantity: 1,
        },
      ],
    };
    const newItem: CartItem = {
      id: 1,
      title: "Product 1",
      price: 10,
      image: "image-url",
      quantity: 1,
    };

    const newState = cartReducer(initialState, {
      type: "ADD_TO_CART",
      payload: newItem,
    });

    expect(newState.cart[0].quantity).toBe(2);
  });

  it("should remove an item from the cart", () => {
    const initialState = {
      cart: [
        {
          id: 1,
          title: "Product 1",
          price: 10,
          image: "image-url",
          quantity: 1,
        },
      ],
    };

    const newState = cartReducer(initialState, {
      type: "REMOVE_FROM_CART",
      payload: 1,
    });

    expect(newState.cart).toEqual([]);
  });

  it("should update the quantity of an item", () => {
    const initialState = {
      cart: [
        {
          id: 1,
          title: "Product 1",
          price: 10,
          image: "image-url",
          quantity: 1,
        },
      ],
    };

    const newState = cartReducer(initialState, {
      type: "UPDATE_QUANTITY",
      payload: { id: 1, quantity: 5 },
    });

    expect(newState.cart[0].quantity).toBe(5);
  });

  it("should load cart from localStorage", () => {
    const savedCart = [
      { id: 1, title: "Saved Product", price: 20, image: "url", quantity: 2 },
    ];
    const initialState = { cart: [] };

    const newState = cartReducer(initialState, {
      type: "LOAD_CART",
      payload: savedCart,
    });

    expect(newState.cart).toEqual(savedCart);
  });

  it("should return the same state for an unknown action (default case)", () => {
    const initialState = {
      cart: [
        {
          id: 1,
          title: "Product 1",
          price: 10,
          image: "image-url",
          quantity: 1,
        },
      ],
    };

    const newState = cartReducer(initialState, {
      type: "UNKNOWN_ACTION",
    } as any);

    expect(newState).toEqual(initialState);
  });
});

describe("CartProvider", () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  );

  it("provides an empty cart initially", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.cart).toEqual([]);
    expect(result.current.totalPrice).toBe(0);
  });

  it("adds an item to the cart using `useCart`", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const product: CartItem = {
      id: 1,
      title: "Product 1",
      price: 10,
      image: "url",
      quantity: 1,
    };

    act(() => {
      result.current.addToCart(product);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].quantity).toBe(1);
    expect(result.current.totalPrice).toBe(10);
  });

  it("removes an item from the cart using `useCart`", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const product: CartItem = {
      id: 1,
      title: "Product 1",
      price: 10,
      image: "url",
      quantity: 1,
    };

    act(() => {
      result.current.addToCart(product);
      result.current.removeFromCart(1);
    });

    expect(result.current.cart).toEqual([]);
    expect(result.current.totalPrice).toBe(0);
  });

  it("updates the quantity of an item using `useCart`", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const product: CartItem = {
      id: 1,
      title: "Product 1",
      price: 10,
      image: "url",
      quantity: 1,
    };

    act(() => {
      result.current.addToCart(product);
      result.current.updateQuantity(1, 5);
    });

    expect(result.current.cart[0].quantity).toBe(5);
    expect(result.current.totalPrice).toBe(50);
  });

  it("persists cart state in localStorage", () => {
    const savedCart = JSON.stringify([
      { id: 1, title: "Saved", price: 10, image: "url", quantity: 1 },
    ]);
    Storage.prototype.getItem = jest.fn(() => savedCart);

    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].title).toBe("Saved");
  });

  it("throws an error if `useCart` is used outside of `CartProvider`", () => {
    try {
      renderHook(() => useCart());
    } catch (error) {
      expect((error as Error).message).toBe(
        "useCart must be used within a CartProvider"
      );
    }
  });
});
