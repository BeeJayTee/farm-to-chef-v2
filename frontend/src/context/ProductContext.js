import { createContext, useReducer } from "react";

export const ProductsContext = createContext();

export const productsReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { products: action.payload };
    case "CREATE_PRODUCT":
      console.log("product created", action.payload);
      console.log({ products: [action.payload, ...state.products] });
      return { products: [action.payload, ...state.products] };
    case "DELETE_PRODUCT":
      return {
        products: state.products.filter((p) => p._id !== action.payload._id),
      };
    case "EDIT_PRODUCT":
      let productToReplace = state.products.filter(
        (p) => p._id === action.payload._id
      );
      productToReplace = action.payload;
      const remainingProducts = state.products.filter(
        (p) => p._id !== action.payload._id
      );
      return { products: [productToReplace, ...remainingProducts] };
    default:
      return state;
  }
};

export const ProductsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, {
    products: null,
  });

  return (
    <ProductsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductsContext.Provider>
  );
};
