export async function fetchCategories() {
    const res = await fetch("https://fakestoreapi.com/products/categories");
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
}

export async function fetchProductsByCategory(category: string) {
    const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
}