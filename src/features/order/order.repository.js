import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import OrderModel from "./order.model.js";

export default class OrderRepository {
  constructor() {
    this.collection = "orders";
  }

  async placeOrder(userId) {
    try {
      const db = getDB();
      // Get cart items and calculate the total amount
      const items = await this.getTotalAmount(userId);
      const FinalAmount = items.reduce(
        (acc, item) => acc + item.totalAmount,
        0,
      );
      console.log(FinalAmount);

      // Create an order record
      const newOrder = new OrderModel(
        new ObjectId(userId),
        FinalAmount,
        new Date(),
      );
      await db.collection(this.collection).insertOne(newOrder);

      // Reduce the stock
      for (let item of items) {
        await db
          .collection("products")
          .updateOne(
            { _id: item.productID },
            { $inc: { stock: -item.quantity } },
          );
      }

      // Clear the cart items
      await db
        .collection("cartItems")
        .deleteMany({ userID: new ObjectId(userId) });
      return;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async getTotalAmount(userId) {
    try {
      const db = getDB();
      const items = await db
        .collection("cartItems")
        .aggregate([
          // Get cart items for the user
          {
            $match: { userID: new ObjectId(userId) },
          },
          // Get the products from products collection
          {
            $lookup: {
              from: "products",
              localField: "productID",
              foreignField: "_id",
              as: "productInfo",
            },
          },
          // Unwind the product info
          {
            $unwind: "$productInfo",
          },
          // Calculate the total amount for each cart item
          {
            $addFields: {
              totalAmount: {
                $multiply: ["$productInfo.price", "$quantity"],
              },
            },
          },
        ])
        .toArray();
      return items;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
}
