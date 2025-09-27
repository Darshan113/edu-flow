export const blockExpensiveItems = (storeAPI) => (next) => (action) => {
  if (action.type === "cart/addItem" && action.payload.price > 100) {
    alert("Item too expensive! Not allowed.");
    return;
  }
  return next(action);
};
