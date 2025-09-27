import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/" }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => "products",
        }),
        getProductById: builder.query({
            query: (id) => `products/${id}`,
        }),
        addProduct: builder.mutation({
            query: (newProduct) => ({
                url: "products",
                method: "POST",
                body: newProduct,
            }),
        }),
    }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useAddProductMutation } = productApi;