import Link from "next/link";
import { useCart } from "../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const CartIcon = () => {
  const { cart } = useCart();

  return (
    <div className="flex-1 flex justify-end relative">
      <Link href="/cart" className="text-2xl relative">
        <FontAwesomeIcon icon={faShoppingCart} className="text-gray-700" />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center animate-bounce">
            {cart.length}
          </span>
        )}
      </Link>
    </div>
  );
};

export default CartIcon;
