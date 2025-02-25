import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <div className="h-[calc(100vh-145px)]">
      <div className="flex flex-row items-center justify-between sticky top-0 h-20 p-6 bg-gray-100 border-b shadow-md z-50">
        <Link href="/" className="text-primary flex-1">
          ⬅ Back
        </Link>
        <div className="flex-1 flex items-center justify-center">
          <div className="lg:text-2xl font-bold sm:text-xl md:text-xl">
            Shopping Cart
          </div>
        </div>
        <div className="flex-1"></div>
      </div>
      <div className="container mx-auto h-full overflow-auto">
        {cart.length === 0 ? (
          <div className="h-full w-full flex justify-center items-center text-primary text-lg">
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <ul>
            {cart.map((item) => (
              <li
                key={item.id}
                className="border-t p-4 flex items-center first:border-t-0"
              >
                <img src={item.image} alt={item.title} className="w-16 h-16" />
                <div className="ml-4">
                  <h2>{item.title}</h2>
                  <p>${item.price}</p>
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        item.quantity - 1 === 0
                          ? removeFromCart(item.id)
                          : updateQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1)
                            )
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      className="w-12 text-center mx-2 border"
                      onChange={(e) =>
                        updateQuantity(
                          item.id,
                          Math.max(1, Number(e.target.value))
                        )
                      }
                    />
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="ml-[10px] text-red-600"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="h-16 fixed bottom-0 left-0 flex items-center w-full p-6 border-t bg-gray-100">
          <h2 className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>
        </div>
      </div>
    </div>
  );
}
