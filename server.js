import "./env.js"
// Import Express
import express from "express";
import swagger from "swagger-ui-express";
import cors from "cors";
import orderRouter from "./src/features/order/order.routes.js";
import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import cartRouter from "./src/features/cartItems/cartItems.routes.js";
import apiDocs from "./swagger.json" with { type: "json" };
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import { ApplicationError } from "./src/error-handler/applicationError.js";
import {connectToMongoDB} from "./src/config/mongodb.js";



// Create Server
const server = express();



// CORS Policy Configuration
var corsOptions = {
  origin: "http://localhost:5500"
};
server.use(cors(corsOptions));



// server.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5500");
//   res.header("Access-Control-Allow-Headers", "*");
//   res.header("Access-Control-Allow-Methods", "*");
//   // Return ok for pre-flight requests
//   if (req.method == "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   next();
// })

server.use(express.json());

server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));

server.use(loggerMiddleware)

// For all the requests related to orders, redirect to order routes 
server.use("/api/orders", jwtAuth, orderRouter);

// For all requests related to products, redirect to product routes
server.use("/api/products",jwtAuth,  productRouter);

// For all the requests related to cartItems, redirect to cart routes
server.use("/api/cartItems", jwtAuth, cartRouter);

// For all requests related to users, redirect to user routes
server.use("/api/users", userRouter);

// Default request handler
server.get("/", (req, res) => {
  res.send("Welcome to e-commerce API");
});

// Error handler middleware
server.use((err, req, res, next) => {
console.log(err);
if(err instanceof ApplicationError){
  return res.status(err.code).send(err.message);
}
// Server error
res.status(500).send("Something went wrong! Please try again later.");
  next();
});


// Middleware to handle 404 requests
server.use((req, res) => {
  res.status(404).send("API not found. Please check our documentation for more information at localhost:3200/api-docs.");
});

// Specify the port and start the server
server.listen(3200, () => {
  console.log("Server is running on port 3200");
  connectToMongoDB()
});
