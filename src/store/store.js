import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import productReducer from "../features/products/productSlice";
import authReducer from "../features/auth/authSlice";
import { saveState, loadState } from "../utils/localStorage";
import { loggerMiddleware } from "../middleware/logger";
import { blockExpensiveItems } from "../middleware/blockExpensiveItems";

// Load persisted state
const preloadedState = loadState();

export const store = configureStore({
    reducer: {
       cart: cartReducer,
       products: productReducer,
       auth: authReducer
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(loggerMiddleware, blockExpensiveItems),
});

// Save state whenever it changes (persist only cart and auth)
store.subscribe(() => {
  saveState({
    cart: store.getState().cart,
    auth: store.getState().auth,
  });
});