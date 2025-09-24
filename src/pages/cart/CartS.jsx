import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../../features/cart/cartSlice";
import { selectCartItems, selectTotalPrice, selectTotalQuanity } from "../../store/cartSelector";

export default function CartS() {
//   const { cartItems, totalPrice, totalQuantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const totalQuantity = useSelector(selectTotalQuanity)
  if (cartItems.length === 0) {
    return <h2 className="p-4">Your cart is empty</h2>;
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Shopping Cart</h2>
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center border p-3 rounded"
        >
          <span>
            {item.title} (${item.price}) x {item.quantity}
          </span>
          <div className="space-x-2">
            <button
              className="px-2 bg-green-600 text-white rounded"
              onClick={() => dispatch(increaseQuantity(item.id))}
            >
              +
            </button>
            <button
              className="px-2 bg-yellow-600 text-white rounded"
              onClick={() => dispatch(decreaseQuantity(item.id))}
            >
              -
            </button>
            <button
              className="px-2 bg-red-600 text-white rounded"
              onClick={() => dispatch(removeItem(item.id))}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="font-bold">
        Total Items: {totalQuantity} | Total Price: ${totalPrice}
      </div>

      <button
        className="bg-gray-800 text-white px-4 py-2 rounded"
        onClick={() => dispatch(clearCart())}
      >
        Clear Cart
      </button>
    </div>
  );
}
