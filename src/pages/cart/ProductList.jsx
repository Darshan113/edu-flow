import { useGetProductsQuery } from "../../services/productApi";


export default function ProductList() {

    const { data: products, error, isLoading } = useGetProductsQuery();

    // const dispatch = useDispatch();
    // const { status, error } = useSelector((state) => state.products);
    // const products = useSelector(selectAllProducts);
    // useEffect(() => {
    //     if (status === "idle") {
    //         dispatch(fetchProducts());
    //     }
    // }, [status, dispatch]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading products</p>;

    return (
        <div>
            <h2>Products (via RTK Query)</h2>
            <ul>
                {products.map((p) => (
                    <li key={p.id}>{p.title} - ${p.price}</li>
                ))}
            </ul>
        </div>
    );

    // if (status === "loading") return <p>Loading products...</p>;
    // if (status === "failed") return <p>Error: {error}</p>;

    // return (
    //     <div className="p-4 space-y-4">
    //         <h2 className="text-xl font-bold">Products</h2>
    //         {products.map((product) => (
    //             <div key={product.id} className="flex justify-between items-center border p-3 rounded">
    //                 <span>{product.title} - ${product.price}</span>
    //                 <button
    //                     onClick={() => dispatch(addItem(product))}
    //                     className="bg-blue-600 text-white px-3 py-1 rounded"
    //                 >
    //                     Add to Cart
    //                 </button>
    //             </div>
    //         ))}
    //     </div>
    // );
}