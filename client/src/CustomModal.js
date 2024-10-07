// src/CustomModal.js
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";

const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    minWidth: "400px", // Minimum width
    maxWidth: "600px", // Maximum width
  },
}));

const CustomModal = ({ isOpen, onClose, message }) => {
  return (
    <CustomDialog open={isOpen} onClose={onClose}>
      <DialogTitle>אישור</DialogTitle>
      <DialogContent>
        <div>{message}</div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          סגור
        </Button>
      </DialogActions>
    </CustomDialog>
  );
};

export default CustomModal;
