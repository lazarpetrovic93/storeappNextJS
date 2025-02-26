import React from "react";
import { render, screen } from "@testing-library/react";
import { useCart } from "@/context/CartContext";
import "@testing-library/jest-dom";
import MainPage, { getStaticProps } from ".";

jest.mock("@/context/CartContext", () => ({
  useCart: jest.fn(),
}));

jest.mock("@/components/CartIcon", () => () => <div data-testid="cart-icon" />);

describe("Shop Page", () => {
  const mockCategories = ["electronics", "jewelery", "men's clothing"];

  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({ cart: [] });
  });

  it("renders shop page correctly", () => {
    render(<MainPage categories={mockCategories} />);

    expect(screen.getByText("Product Categories")).toBeInTheDocument();
    expect(screen.getByTestId("cart-icon")).toBeInTheDocument();
    expect(screen.getByText("electronics")).toBeInTheDocument();
    expect(screen.getByText("jewelery")).toBeInTheDocument();
    expect(screen.getByText("men's clothing")).toBeInTheDocument();
  });

  it("renders category links correctly", () => {
    render(<MainPage categories={mockCategories} />);

    const categoryLinks = screen.getAllByRole("link");
    expect(categoryLinks).toHaveLength(mockCategories.length);
    expect(categoryLinks[0]).toHaveAttribute("href", "/category/electronics");
    expect(categoryLinks[1]).toHaveAttribute("href", "/category/jewelery");
    expect(categoryLinks[2]).toHaveAttribute(
      "href",
      "/category/men's clothing"
    );
  });

  it("fetches categories in getStaticProps", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockCategories),
      })
    ) as jest.Mock;

    const { props } = await getStaticProps();

    expect(props.categories).toEqual(mockCategories);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://fakestoreapi.com/products/categories"
    );
  });
});
