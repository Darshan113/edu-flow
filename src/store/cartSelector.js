import { useSelector } from "react-redux";

export const selectCartItems = (state) => state.cart.cartItems;
export const selectTotalQuanity = (state) => state.cart.totalQuantity;
export const selectTotalPrice = (state) => state.cart.totalPrice;
