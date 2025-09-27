import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productEntityAdapter = createEntityAdapter();

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await axios.get("https://fakestoreapi.com/products");
        return response.data;
    }
)

const productSlice = createSlice({
    name: 'products',
    initialState: productEntityAdapter.getInitialState({
        status: "idle",
        error: null,
    }),
    reducers: {
        productAdded: productEntityAdapter.addOne,
        productUpdated: productEntityAdapter.updateOne,
        productRemoved: productEntityAdapter.removeOne,
        productReceived: productEntityAdapter.setAll,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                productEntityAdapter.setAll(state, action.payload);
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    }
})

// exports selctors
export const {
    selectAll: selectAllProducts,
    selectById: selectProductById
} = productEntityAdapter.getSelectors(state => state.products);

export default productSlice.reducer;