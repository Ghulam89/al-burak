import { createSlice } from "@reduxjs/toolkit";
export const nextSlice = createSlice({
  name: "next",
  initialState: {
    productData: [],
    favoriteData: [],
    userInfo: null,
    allProducts: [],
  },
  reducers: {
    addToCart: (state, action) => {
      if (!state.productData) {
        state.productData = [];
      }
      const existingProduct = state.productData.find(
        (item) => item._id === action.payload._id
      );
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.productData.push(action.payload);
      }
    },
    addToFavorite: (state, action) => {
      if (!state.favoriteData) {
        state.favoriteData = [];
      }
      const existingProduct = state.favoriteData.find(
        (item) => item._id === action.payload._id
      );
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.favoriteData.push(action.payload);
      }
    },
    increaseQuantity: (state, action) => {
      const existingProduct = state.productData.find(
        (item) => item._id === action.payload._id
      );
      if (existingProduct) existingProduct.quantity++;
    },
    decreaseQuantity: (state, action) => {
      const existingProduct = state.productData.find(
        (item) => item._id === action.payload._id
      );
      if (existingProduct && existingProduct.quantity > 1) {
        existingProduct.quantity--;
      }
    },
    deleteProduct: (state, action) => {
      state.productData = state.productData.filter(
        (item) => item._id !== action.payload
      );
    },
    resetCart: (state) => {
      state.productData = [];
    },
    addUser: (state, action) => {
      state.userInfo = action.payload;
    },
    removeUser: (state) => {
      state.userInfo = null;
    },
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  addToFavorite,
  deleteProduct,
  resetCart,
  addUser,
  removeUser,
  setAllProducts,
} = nextSlice.actions;

export default nextSlice.reducer;
