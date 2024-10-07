import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategory,
  setProduct,
  setQuantity,
  addToCart,
  fetchCategories,
} from "./slices/productSlice";
import { useNavigate } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import {
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { Box } from "@mui/material";

const theme = createTheme({
  direction: "rtl",
});

const ProductSelection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    categories,
    selectedCategory,
    selectedProduct,
    quantity,
    cart,
    loading,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    // Fetch categories when the component mounts
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryChange = (e) => {
    const categoryId = parseInt(e.target.value);
    dispatch(setCategory(categoryId));
  };

  const handleProductChange = (e) => {
    const productId = parseInt(e.target.value);
    const product = categories
      .find((cat) => cat.id === selectedCategory)
      ?.products.find((prod) => prod.id === productId);
    dispatch(setProduct(product));
  };

  const handleQuantityChange = (e) => {
    dispatch(setQuantity(Number(e.target.value)));
  };

  const handleAddToCart = () => {
    dispatch(addToCart());
  };

  const handleProceedToOrder = () => {
    navigate("/order");
  };

  const selectedCategoryObj = categories.find(
    (cat) => cat.id === selectedCategory
  );

  // Handle loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        {" "}
        {/* Ensure FormControl has minimum width */}
        <Typography variant="h4" align="center">
          בחירת מוצר
        </Typography>
        <Box sx={{ mb: 2 }}>
          {" "}
          {/* Use Box for spacing */}
          <label style={{ width: "200px" }}>קטגוריה:</label>
          <Select
            onChange={handleCategoryChange}
            sx={{ minWidth: 200, mt: 2 }} // Add mt (margin-top) for spacing
          >
            <MenuItem value="">בחר קטגוריה</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
        {selectedCategory && selectedCategoryObj && (
          <Box sx={{ mb: 2 }}>
            <label style={{ width: "200px" }}>מוצר:</label>
            <Select
              onChange={handleProductChange}
              sx={{ minWidth: 200, mt: 2 }} // Add mt (margin-top) for spacing
            >
              <MenuItem value="">בחר מוצר</MenuItem>
              {selectedCategoryObj.products.map((prod) => (
                <MenuItem key={prod.id} value={prod.id}>
                  {prod.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        )}
        {selectedProduct && (
          <div>
            <label style={{ width: "200px" }}>כמות:</label>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
            />

            <Button onClick={handleAddToCart}>הוספה לעגלה</Button>
          </div>
        )}
        <h2>עגלת קניות</h2>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.product.name} - כמות: {item.quantity}
            </li>
          ))}
        </ul>
        {cart.length > 0 && (
          <Button onClick={handleProceedToOrder}>המשך לתשלום</Button>
        )}
      </FormControl>
    </div>
  );
};

export default ProductSelection;
