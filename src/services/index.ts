const BASE_URL = "https://fakestoreapi.com/products";

async function fetchData<T>(endpoint: string): Promise<T> {
    try {
        const res = await fetch(`${BASE_URL}/${endpoint}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            throw new Error(`Error fetching data: ${res.status} ${res.statusText}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}

export function fetchCategories() {
    return fetchData<string[]>("categories");
}

export function fetchProductsByCategory(category: string) {
    return fetchData<string[]>(`category/${encodeURIComponent(category)}`);
}