// Manage routes/paths to userController
// Import express
import express from "express";
import UserController from "./user.controller.js";

// Initialize Express Router
const userRouter = express.Router();

// Create an instance of userController
const userController = new UserController();

// All the paths to controller methods
userRouter.post("/signup", (req, res, next) => {
  userController.signUp(req, res, next);
});
userRouter.post("/signin", (req, res) => {
  userController.signIn(req, res);
});
export default userRouter;
