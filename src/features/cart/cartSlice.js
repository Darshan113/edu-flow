import { createSlice } from "@reduxjs/toolkit"


// create initial state
const initialState = {
    cartItems: [],
    totalQuantity: 0,
    totalPrice: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const item = action.payload;
            const existing = state.cartItems.find((p) => p.id === item.id);

            if (existing) {
                existing.quantity += 1;
            } else {
                state.cartItems.push({ ...item, quantity: 1 });
            }

            state.totalQuantity += 1;
            state.totalPrice += item.price;
        },
        removeItem: (state, action) => {
            const id = action.payload;
            const item = state.cartItems.find((p) => p.id === id);
            if (!item) return;

            state.totalQuantity -= item.quantity;
            state.totalPrice -= item.price * item.quantity;
            state.cartItems = state.cartItems.filter((p) => p.id !== id);
        },
        increaseQuantity: (state, action) => {
            const id = action.payload;
            const item = state.cartItems.find((p) => p.id === id);
            if (item) {
                item.quantity += 1;
                state.totalQuantity += 1;
                state.totalPrice += item.price;
            }
        },
        decreaseQuantity: (state, action) => {
            const id = action.payload;
            const item = state.cartItems.find((p) => p.id === id);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                state.totalQuantity -= 1;
                state.totalPrice -= item.price;
            }
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        }
    }
})

export const {addItem,removeItem,increaseQuantity,decreaseQuantity,clearCart} = cartSlice.actions;
export default cartSlice.reducer;