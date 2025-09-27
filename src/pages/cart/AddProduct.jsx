import { useState } from "react";
import { useAddProductMutation } from "../../services/productApi";


export default function AddProduct() {

    const [title, setTitle] = useState("");
    const [addProduct] = useAddProductMutation()

    const handleAdd = async () => {
        await addProduct({ title, price: 10 });
        setTitle("");
    }

    return (
        <div>
            <input
                type="text"
                value={title}
                placeholder="Product name"
                onChange={(e) => setTitle(e.target.value)}
            />
            <button onClick={handleAdd}>Add Product</button>
        </div>
    );
}