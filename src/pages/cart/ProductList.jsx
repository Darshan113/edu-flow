import { useDispatch, useSelector } from "react-redux"
import { addItem } from "../../features/cart/cartSlice";
import { fetchProducts, selectAllProducts } from "../../features/products/productSlice";
import { useEffect } from "react";


export default function ProductList() {
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.products);
    const products = useSelector(selectAllProducts);
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    if (status === "loading") return <p>Loading products...</p>;
    if (status === "failed") return <p>Error: {error}</p>;

    return (
        <div className="p-4 space-y-4">
            <h2 className="text-xl font-bold">Products</h2>
            {products.map((product) => (
                <div key={product.id} className="flex justify-between items-center border p-3 rounded">
                    <span>{product.title} - ${product.price}</span>
                    <button
                        onClick={() => dispatch(addItem(product))}
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                        Add to Cart
                    </button>
                </div>
            ))}
        </div>
    );
}