import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: [],
  selectedCategory: null,
  selectedProduct: null,
  quantity: 1,
  cart: [],
  loading: false,
  error: null,
};

// Create an async thunk to fetch categories from the API
// export const fetchCategories = createAsyncThunk(
//   "products/fetchCategories",
//   async () => {
//     try {
//       const response = await axios.get("/api/orders/categories");
//       return response.data;
//     } catch (error) {
//       // Handle error (e.g., logging, custom error messages)
//       throw Error("Failed to fetch categories: " + error.message);
//     }
//   }
// );

// export const fetchCategories = createAsyncThunk(
//   "products/fetchCategories",
//   async () => {
//     const response = await axios.get(
//       "http://localhost:5207/api/orders/categories"
//     ); // Use lowercase 'orders'
//     return response.data;
//   }
// );

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const response = await axios.get(
      "http://localhost:5207/api/orders/categories"
      //"http://www.hon4u.com:5207/BitTest/api/orders/categories"
    );

    // Log the response data to inspect its structure
    console.log("Fetched Categories Data:", response.data);

    // Restructure data
    const categories = [];
    response.data.forEach((item) => {
      const category = categories.find((cat) => cat.id === item.categoryId); // Make sure `item.categoryId` is correct
      if (!category) {
        categories.push({
          id: item.categoryId,
          name: item.categoryName,
          products: [],
        });
      }
      // Ensure that `item.productId` and `item.productName` match your API's response structure
      categories
        .find((cat) => cat.id === item.categoryId)
        .products.push({
          id: item.productId,
          name: item.productName,
        });
    });

    return categories;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategory(state, action) {
      state.selectedCategory = action.payload;
      state.selectedProduct = null;
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
        state.selectedProduct = null;
        state.quantity = 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCategory, setProduct, setQuantity, addToCart } =
  productSlice.actions;
export default productSlice.reducer;
