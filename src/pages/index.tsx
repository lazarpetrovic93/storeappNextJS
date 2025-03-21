import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CartIcon from "@/components/CartIcon";

export default function MainPage({ categories }: { categories: string[] }) {
  const { cart } = useCart();
  return (
    <>
      <div className="flex flex-row items-center justify-between mb-6 sticky top-0 h-20 p-6 bg-gray-100 border-b shadow-md z-50">
        <div className="flex-1"></div>
        <div className="flex-1 text-center font-bold sm:text-lg md:text-xl lg:text-2xl">
          Product Categories
        </div>
        <CartIcon />
      </div>

      <div className="container mx-auto p-6">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:text-base">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/category/${category}`}
              className="text-primary bg-white capitalize h-full w-full border p-4 text-center cursor-pointer rounded shadow-md 
hover:bg-primary hover:text-white hover:shadow-lg transition duration-300"
            >
              {category}
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  const categories = await res.json();

  return {
    props: { categories },
    revalidate: 86400,
  };
}
