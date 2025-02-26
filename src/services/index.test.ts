import { fetchCategories, fetchProductsByCategory } from "./index";

global.fetch = jest.fn();

describe("API functions", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("fetchCategories should return an array of categories", async () => {
        const mockCategories = ["electronics", "jewelery", "men's clothing"];

        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockCategories),
        });

        const result = await fetchCategories();

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith("https://fakestoreapi.com/products/categories", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        expect(result).toEqual(mockCategories);
    });

    it("fetchProductsByCategory should return products for a given category", async () => {
        const mockProducts = [
            { id: 1, title: "Product 1", category: "electronics" },
            { id: 2, title: "Product 2", category: "electronics" },
        ];

        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockProducts),
        });

        const result = await fetchProductsByCategory("electronics");

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith("https://fakestoreapi.com/products/category/electronics", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        expect(result).toEqual(mockProducts);
    });

    it("should throw an error if fetch fails", async () => {
        (fetch as jest.Mock).mockResolvedValue({
            ok: false,
            status: 500,
            statusText: "Internal Server Error",
        });

        await expect(fetchCategories()).rejects.toThrow("Error fetching data: 500 Internal Server Error");
    });
});