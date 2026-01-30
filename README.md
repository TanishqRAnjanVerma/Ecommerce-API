# E-Commerce REST API

A robust and scalable RESTful API backend for an E-Commerce platform built with Node.js, Express, and MongoDB. This API handles user authentication, product management (including image uploads), shopping cart operations, and order processing. It features secure JWT authentication, optimized database indexing, and comprehensive API documentation via Swagger UI.

## Features

- **🔐 User Authentication**: Secure Signup and Signin functionality using JSON Web Tokens (JWT).
- **📦 Product Management**:
  - CRUD operations for products.
  - Image upload support using `multer`.
  - Optimized search and filtering capabilities.
- **🛒 Shopping Cart**:
  - Persistent cart management for users.
  - Add, remove, and view items.
  - Custom auto-incrementing IDs for cart items.
- **📦 Order Processing**: Seamless conversion of cart items into customer orders.
- **⚡ Database Optimization**:
  - Native MongoDB driver integration.
  - Automatic index creation for high-performance querying.
- **📄 Documentation**: Integrated Swagger UI for interactive API exploration.
- **🛡️ Security**: Input validation using `express-validator` and secure environment configuration.

## Prerequisites

- **Node.js** (v14 or higher recommended)
- **MongoDB** (Local instance or MongoDB Atlas)
- **npm** (Node Package Manager)

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Native Driver)
- **Authentication**: JWT (JSON Web Tokens)
- **File Uploads**: Multer
- **Validation**: Express Validator
- **Logging**: Winston
- **Documentation**: Swagger UI Express

## Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd E-Com-api
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add the following configuration:
   ```env
   DB_URL=mongodb://localhost:27017/ecom_db
   # Add other keys if necessary (e.g., JWT_SECRET, PORT)
   ```

## Database Architecture

The application connects to MongoDB using the official driver and performs automatic initialization upon connection:

1.  **Connection**: Establishes a connection pool to the MongoDB instance defined in `DB_URL`.
2.  **Counters**: Initializes a `counters` collection to manage unique sequences (e.g., `cartItemId`).
3.  **Indexing**: Automatically creates indexes on the `products` collection to optimize query performance:
    - `price`: Ascending (`1`) - For sorting by price.
    - `name` (Ascending) & `category` (Descending) - Compound index for efficient categorization and sorting.
    - `desc`: Text Index - Enables full-text search on product descriptions.

## API Endpoints

The API is designed around RESTful principles. Below is a summary of the available endpoints.

### 👤 User / Authentication

| Method | Endpoint            | Description                               |
| :----- | :------------------ | :---------------------------------------- |
| `POST` | `/api/users/signup` | Register a new user account.              |
| `POST` | `/api/users/signin` | Log in with credentials to receive a JWT. |

### 📦 Products

| Method | Endpoint            | Description                                                          |
| :----- | :------------------ | :------------------------------------------------------------------- |
| `GET`  | `/api/products`     | Retrieve all products. Supports filtering and sorting.               |
| `GET`  | `/api/products/:id` | Get detailed information for a specific product.                     |
| `POST` | `/api/products`     | Add a new product (supports image upload via `multipart/form-data`). |

### 🛒 Cart (Protected)

_Requires valid JWT in Authorization header._

| Method   | Endpoint                | Description                                     |
| :------- | :---------------------- | :---------------------------------------------- |
| `GET`    | `/api/cart`             | View items in the current user's cart.          |
| `POST`   | `/api/cart`             | Add a product to the cart.                      |
| `DELETE` | `/api/cart/:cartItemId` | Remove a specific item from the cart by its ID. |

### 📦 Orders (Protected)

_Requires valid JWT in Authorization header._

| Method | Endpoint      | Description                                           |
| :----- | :------------ | :---------------------------------------------------- |
| `POST` | `/api/orders` | Place an order using the items currently in the cart. |

## Running the Application

1. **Start the server:**

   ```bash
   npm start
   ```

   _Or for development:_

   ```bash
   node server.js
   ```

   The server runs on `http://localhost:3200`.

2. **Access API Documentation:**
   Open your browser and navigate to:
   `http://localhost:3200/api-docs`
