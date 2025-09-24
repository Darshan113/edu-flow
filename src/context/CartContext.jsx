import { createContext, useContext, useReducer } from "react";

// Initial state
const initialState = {
  items: [],
  total: 0,
};

// Reducer function
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, action.payload],
        total: state.total + action.payload.price,
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
        total: state.total - action.payload.price,
      };

    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
}

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [state,dispatch] = useReducer(cartReducer,initialState);
    return (
        <CartContext.Provider value={{ state, dispatch }}>
        {children}
        </CartContext.Provider>
    )
}