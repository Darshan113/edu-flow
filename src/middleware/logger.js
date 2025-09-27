export const loggerMiddleware = (storeAPI) => (next) => (action) => {
  console.log("Dispatching:", action.type, "Payload:", action.payload);
  const result = next(action);
  console.log("Next State:", storeAPI.getState());
  return result;
};
