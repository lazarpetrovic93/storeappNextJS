import React from "react";
import { CartItem, useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "@/components/Tooltip";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/Button";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  const handleMinusButtonClick = (item: CartItem) =>
    item.quantity - 1 === 0
      ? removeFromCart(item.id)
      : updateQuantity(item.id, Math.max(1, item.quantity - 1));

  const handlePlusButtonClick = (item: CartItem) =>
    updateQuantity(item.id, item.quantity + 1);

  return (
    <div className="h-[calc(100vh-145px)]">
      <div className="flex flex-row items-center justify-between sticky top-0 h-20 p-6 bg-gray-100 border-b shadow-md z-50">
        <Link href="/" className="text-primary flex-1">
          <FontAwesomeIcon
            icon={faChevronLeft}
            size="lg"
            className="text-primary hover:scale-110 hover:-translate-x-1 transition-transform duration-200"
          />
        </Link>
        <div className="flex-1 flex items-center justify-center">
          <div className="font-bold sm:text-lg md:text-xl lg:text-2xl">
            Shopping Cart
          </div>
        </div>
        <div className="flex-1"></div>
      </div>

      <div className="container mx-auto h-full">
        <div className="w-full">
          <div className="grid grid-cols-[auto_100px_120px_60px] gap-3 px-4 py-2 font-semibold text-primary border-b bg-white sticky top-0 z-10">
            <span className="text-left">Item</span>
            <span className="text-center">Price</span>
            <span className="text-center">Quantity</span>
            <span className="text-center"></span>
          </div>
          <div className="overflow-y-auto scrollbar-hidden pb-20 h-[calc(100vh-190px)]">
            <ul>
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="grid grid-cols-[auto_100px_120px_60px] gap-3 p-4 border-b items-center"
                >
                  <div className="flex gap-3 min-w-0 flex-col lg:flex-row md:flex-row">
                    <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 flex">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={64}
                        height={64}
                        className="object-contain rounded"
                      />
                    </div>

                    <Tooltip text={item.title} position="bottom">
                      <h2 className="text-base truncate w-full font-medium lg:mt-0 md:mt-0 sm:mt-3">
                        {item.title}
                      </h2>
                    </Tooltip>
                  </div>

                  <p className="text-right text-orange font-medium w-20">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>

                  <div className="flex items-center justify-center w-full">
                    <Button
                      onClick={() => handleMinusButtonClick(item)}
                      className="px-2"
                    >
                      -
                    </Button>
                    <input
                      type="number"
                      value={item.quantity}
                      data-testid="quantity-input"
                      className="w-12 text-center mx-2 border rounded"
                      onChange={(e) =>
                        updateQuantity(
                          item.id,
                          Math.max(1, Number(e.target.value))
                        )
                      }
                    />
                    <Button
                      onClick={() => handlePlusButtonClick(item)}
                      className="px-2"
                    >
                      +
                    </Button>
                  </div>
                  <div className="flex items-center justify-center w-10">
                    <Button
                      className="text-gray-500 hover:text-orange transition"
                      onClick={() => removeFromCart(item.id)}
                      data-testid="delete-button"
                    >
                      <FontAwesomeIcon icon={faTrash} size="lg" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="h-16 fixed bottom-0 left-0 right-0 flex items-center w-full p-6 border-t bg-gray-100 justify-end">
          <h2 className="text-xl font-semibold">
            Total: ${totalPrice.toFixed(2)}
          </h2>
        </div>
      </div>
    </div>
  );
}
