import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";

export default class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  // Get all products
  async getAllProducts(req, res) {
    try {
      const { minPrice, maxPrice, category } = req.query;
      let products = await this.productRepository.getAll();
      if (minPrice || maxPrice || category) {
        products = this.productRepository.filter(minPrice, maxPrice, category);
      }
      res.status(200).send(products);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something went wrong");
    }
  }

  // Add a new product
  async addProduct(req, res) {
    try {
      const { name, desc, price, category, sizes } = req.body;
      const newProduct = new ProductModel(
        name,
        desc,
        parseFloat(price),
        req.file.filename,
        category,
        sizes.split(",")
      );
      console.log(newProduct);
      const createdRecord = await this.productRepository.add(newProduct);
      res.status(201).send(createdRecord);
      console.log(createdRecord);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something went wrong");
    }
  }

  // Get a single product by ID
  async getOneProduct(req, res) {
    try {
      const id = req.params.id;
      const product = await this.productRepository.getOne(id);
      if (!product) {
        res.status(404).send("Product not found");
      } else {
        return res.status(200).send(product);
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something went wrong");
    }
  }

  // Filter products
  async filterProducts(req, res) {
    try {
      const minPrice = req.query.minPrice;
      const maxPrice = req.query.maxPrice;
      const category = req.query.category;
      if (minPrice || maxPrice || category) {
        const products = await this.productRepository.filter(
          minPrice,
          maxPrice,
          category
        );
        return res.status(200).send(products);
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something went wrong");
    }
  }

  // Rate a product
  async rateProduct(req, res) {
    try {
      const userID = req.userID;
      const productID = req.body.productID;
      const rating = req.body.rating;
      await this.productRepository.rateProduct(userID, productID, rating);
      return res.status(200).send("Product rated successfully");
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something went wrong");
    }
  }

  async averagePrice(req, res) {
    try {
      const result =
        await this.productRepository.averageProductPricePerCategory();
      return res.status(200).send(result);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something went wrong");
    }
  }
}
