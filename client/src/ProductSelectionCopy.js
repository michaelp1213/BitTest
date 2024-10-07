// src/ProductSelection.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategory,
  setProduct,
  setQuantity,
  addToCart,
} from "./slices/productSliceCopy";
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

const theme = createTheme({
  direction: "rtl",
});

const ProductSelectionCopy = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, selectedCategory, selectedProduct, quantity, cart } =
    useSelector((state) => state.products);

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

  return (
    <div style={{ padding: "20px" }}>
      <FormControl sx={{ m: 1, minWidth: 100 }}>
        <Typography variant="h4" align="center">
          בחירת מוצר
        </Typography>
        <label>
          קטגוריה:
          <Select onChange={handleCategoryChange}>
            {/* <MenuItem  value="">בחירת קטגוריה</MenuItem > */}
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </label>

        {selectedCategory && (
          <label>
            מוצר:
            <Select onChange={handleProductChange}>
              {/* <menuItem  value="">בחירת מוצר</menuItem > */}
              {selectedCategoryObj.products.map((prod) => (
                <MenuItem key={prod.id} value={prod.id}>
                  {prod.name}
                </MenuItem>
              ))}
            </Select>
          </label>
        )}

        {selectedProduct && (
          <div>
            <label>
              כמות:
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
              />
            </label>
            <button onClick={handleAddToCart}>הוספה לעגלה</button>
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
          <button onClick={handleProceedToOrder}>המשך לתשלום</button>
        )}
      </FormControl>
    </div>
  );
};

export default ProductSelectionCopy;
