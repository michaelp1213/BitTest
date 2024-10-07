// src/slices/productSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [
    {
      id: 1,
      name: "חלב וגבינות",
      products: [
        { id: 11, name: "קוטג" },
        { id: 12, name: "חלב 3%" },
        { id: 13, name: " שמנת חמוצה" },
        { id: 14, name: "גבינה צהובה" },
      ],
    },
    {
      id: 2,
      name: "בשר ודגים",
      products: [
        { id: 21, name: "נקניקיות" },
        { id: 22, name: "שוקיים" },
        { id: 23, name: "סלמון" },
      ],
    },
    {
      id: 3,
      name: "פירות וירקות",
      products: [
        { id: 31, name: "מלפפון" },
        { id: 32, name: "עגבניה" },
        { id: 33, name: "תפוח" },
        { id: 34, name: "אפרסק" },
      ],
    },
    {
      id: 4,
      name: "טואלטיקה",
      products: [
        { id: 41, name: "נייר טואלט" },
        { id: 42, name: "סבון" },
        { id: 43, name: "משחת שיניים" },
      ],
    },
  ],
  selectedCategory: null,
  selectedProduct: null,
  quantity: 1,
  cart: [],
};

const productSliceCopy = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategory(state, action) {
      state.selectedCategory = action.payload;
      state.selectedProduct = null; // Reset selected product when category changes
    },
    setProduct(state, action) {
      state.selectedProduct = action.payload;
    },
    setQuantity(state, action) {
      state.quantity = action.payload;
    },
    addToCart(state) {
      if (state.selectedProduct) {
        state.cart.push({
          product: state.selectedProduct,
          quantity: state.quantity,
        });
        state.selectedProduct = null; // Reset selected product
        state.quantity = 1; // Reset quantity
      }
    },
  },
});

export const { setCategory, setProduct, setQuantity, addToCart } =
  productSlice.actions;
export default productSliceCopy.reducer;
