import { useRouter } from "next/router";
import { useState, useMemo } from "react";
import { CartItem, useCart } from "@/context/CartContext";
import { fetchProductsByCategory } from "@/services";
import Image from "next/image";
import Link from "next/link";
import CartIcon from "@/components/CartIcon";
import Button from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { GetServerSidePropsContext } from "next";

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
        <Link
          href="/"
          className="flex items-center text-primary hover:text-blue-600 transition-all flex-1"
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            size="lg"
            className="text-primary hover:scale-110 hover:-translate-x-1 transition-transform duration-200"
          />
        </Link>

        <div className="font-bold capitalize md:text-xl lg:text-2xl flex-1 flex flex-row justify-center">
          {category} ({products.length})
        </div>
        <CartIcon />
      </div>

      <div className="container mx-auto p-6">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <li
              key={product.id}
              className="border p-4 flex flex-col justify-between items-center text-center bg-white shadow-md rounded-lg h-full"
            >
              <div className="flex flex-col items-center gap-2">
                <Image
                  src={product.image}
                  alt={product.title}
                  className="object-contain"
                  height={128}
                  width={128}
                />
                <h2 className="text-base font-semibold">{product.title}</h2>
              </div>
              <div className="flex flex-col items-center w-full mt-auto">
                <p className="text-orange font-medium">
                  ${product.price.toFixed(2)}
                </p>
                <Button
                  onClick={() => handleOnClick(product)}
                  disabled={loadingProductId === product.id}
                  variant="primary"
                  className="h-10 w-32"
                  isLoading={product.id === loadingProductId}
                >
                  Add to Cart
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  try {
    if (!params?.category || typeof params.category !== "string") {
      return { notFound: true };
    }
    const products = await fetchProductsByCategory(params.category);
    return { props: { category: params.category, products } };
  } catch {
    return { notFound: true };
  }
}
