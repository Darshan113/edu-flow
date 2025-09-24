// src/pages/CartPage.jsx
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { state, dispatch } = useContext(CartContext);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {state.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="space-y-2">
          {state.items.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center border p-3 rounded"
            >
              <span>{item.name} - ${item.price}</span>
              <button
                onClick={() =>
                  dispatch({ type: "REMOVE_ITEM", payload: item })
                }
                className="px-2 py-1 bg-red-600 text-white rounded"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <h3 className="mt-4 text-xl font-semibold">
        Total: ${state.total}
      </h3>

      <div className="mt-4 space-x-3">
        <button
          onClick={() => dispatch({ type: "CLEAR_CART" })}
          className="px-3 py-1 bg-gray-600 text-white rounded"
        >
          Clear Cart
        </button>
        <Link to="/shop" className="text-blue-600">
          ← Back to Shop
        </Link>
      </div>
    </div>
  );
}
