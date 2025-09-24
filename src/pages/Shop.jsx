// src/pages/ShopPage.jsx
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router";

const products = [
  { id: 1, name: "Laptop", price: 500 },
  { id: 2, name: "Phone", price: 300 },
  { id: 3, name: "Headphones", price: 100 },
];

export default function ShopPage() {
  const { dispatch } = useContext(CartContext);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Shop</h2>
      <div className="grid grid-cols-3 gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="border p-4 rounded shadow flex flex-col items-center"
          >
            <h3 className="font-semibold">{p.name}</h3>
            <p>${p.price}</p>
            <button
              onClick={() =>
                dispatch({ type: "ADD_ITEM", payload: p })
              }
              className="mt-2 px-3 py-1 bg-blue-600 text-white rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <Link to="/cart" className="block mt-6 text-blue-600">
        Go to Cart →
      </Link>
    </div>
  );
}
