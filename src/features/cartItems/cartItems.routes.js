// Manage routes/paths to ProductController
// Import express
import express from "express";
import CartItemsController from "./cartItems.controller.js";

// Initialize Express Router
const cartRouter = express.Router();

// Create an instance of ProductController
const cartController = new CartItemsController();

cartRouter.post("/", (req, res, next) => {
  cartController.add(req, res, next);
});
cartRouter.get("/", (req, res, next) => {
  cartController.get(req, res, next);
});
cartRouter.delete("/:id", (req, res, next) => {
  cartController.delete(req, res, next);
});

export default cartRouter;
