import { useRouter } from "next/router";
import { useState, useMemo } from "react";
import { CartItem, useCart } from "@/context/CartContext";
import { fetchProductsByCategory } from "@/services";
import Link from "next/link";

export default function CategoryPage({
  category,
  products,
}: {
  category: string;
  products: CartItem[];
}) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [loadingProductId, setLoadingProductId] = useState<number | null>(null);

  const memoizedProducts = useMemo(() => products, [products]);

  const handleOnClick = (product: CartItem) => {
    setLoadingProductId(product.id);
    addToCart(product);
    setTimeout(() => {
      setLoadingProductId(null);
    }, 500);
  };

  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="flex flex-row items-center justify-between mb-6 sticky top-0 h-20 p-6 bg-gray-100 border-b shadow-md z-50">
        <Link href="/" className="text-primary">
          ⬅ Back
        </Link>
        <div className="font-bold capitalize md:text-xl lg:text-2xl">
          {category} ({memoizedProducts.length})
        </div>
        <Link href="/cart" className="text-2xl">
          🛒
        </Link>
      </div>

      <div className="container mx-auto p-6">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {memoizedProducts.map((product) => (
            <li
              key={product.id}
              className="border p-4 flex flex-col items-center text-center bg-white shadow-md rounded-lg"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-32 h-32 object-contain mb-2"
              />
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-orange font-bold">
                ${product.price.toFixed(2)}
              </p>
              <button
                className="mt-2 px-4 py-2 bg-primary text-white rounded transition-all hover:bg-white hover:text-primary hover:border-primary hover:border"
                onClick={() => handleOnClick(product)}
                disabled={loadingProductId === product.id}
              >
                {loadingProductId === product.id ? "Adding..." : "Add to Cart"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }: any) {
  try {
    const products = await fetchProductsByCategory(params.category);
    return { props: { category: params.category, products } };
  } catch {
    return { notFound: true };
  }
}
