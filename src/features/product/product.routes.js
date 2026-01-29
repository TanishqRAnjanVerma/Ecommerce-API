// Manage routes/paths to ProductController
// Import express
import express from "express";
import ProductController from "./product.controller.js";
import { upload } from "../../middlewares/fileupload.middleware.js";

// Initialize Express Router
const productRouter = express.Router();

// Create an instance of ProductController
const productController = new ProductController();

// All the paths to controller methods
productRouter.get("/filter", (req, res, next) => {
  productController.filterProducts(req, res, next);
});
productRouter.get("/", (req, res, next) => {
  productController.getAllProducts(req, res, next);
});
productRouter.post("/", upload.single("imageUrl"), (req, res, next) => {
  productController.addProduct(req, res, next);
});

productRouter.get("/averagePrice", (req, res, next) => {
  productController.averagePrice(req, res, next);
});
productRouter.get("/:id", (req, res, next) => {
  productController.getOneProduct(req, res, next);
});
productRouter.post("/rate", (req, res, next) => {
  productController.rateProduct(req, res, next);
});

export default productRouter;
