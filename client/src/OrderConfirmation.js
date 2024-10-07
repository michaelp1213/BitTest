import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, TextField, Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import CustomModal from "./CustomModal";

const theme = createTheme({
  direction: "rtl",
});

const OrderConfirmation = () => {
  const { cart } = useSelector((state) => state.products);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [modalmsg, setModalmsg] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null); // State for order details

  const handleShowModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderDetailsToSubmit = {
      firstName,
      lastName,
      address,
      email,
      products: cart,
    };

    fetch("http://localhost:5207/api/orders/create", {
      //fetch("http://www.hon4u.com:5207/BitTest/api/orders/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDetailsToSubmit),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Order submitted:", data);
        const orderId = data.id; // Assuming `data` is the response you receive
        setModalmsg(`ההזמנה אושרה!  `); // Customize your message
        //setModalmsg(`Order confirmed! Your order ID is: ${orderId}`);

        //setOrderDetails(data); // Set the received order details
        //setModalmsg(`ההזמנה אושרה! מספר הזמנה: ${orderId}`); // Customize your message
        handleShowModal(); // Show modal with confirmation
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error occurred: " + error.message);
      });
  };

  return (
    <div style={{ padding: "20px", margin: "20px" }}>
      <Typography variant="h4" align="center">
        אישור הזמנה
      </Typography>
      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        message={modalmsg}
      />
      <form onSubmit={handleSubmit}>
        <TextField
          sx={{
            direction: "rtl",
            textAlign: "right",
            "& .MuiInputBase-input": {
              direction: "rtl",
              textAlign: "right",
            },
          }}
          label="שם פרטי"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <br />
        <TextField
          sx={{
            direction: "rtl",
            textAlign: "right",
            "& .MuiInputBase-input": {
              direction: "rtl",
              textAlign: "right",
            },
          }}
          label="שם משפחה"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <br />
        <TextField
          sx={{
            direction: "rtl",
            textAlign: "right",
            "& .MuiInputBase-input": {
              direction: "rtl",
              textAlign: "right",
            },
          }}
          label="כתובת"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <br />
        <TextField
          label="דואר אלקטרוני"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <br />
        <h2>מוצרים שנבחרו</h2>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.product.name} - כמות: {item.quantity}
            </li>
          ))}
        </ul>
        <Button variant="contained" color="primary" type="submit">
          אשר הזמנה
        </Button>
      </form>
    </div>
  );
};

export default OrderConfirmation;
