# E-Com API

A Node.js based E-Commerce API backend using MongoDB.

## Features

- **Database**: MongoDB integration with automatic index management and counter initialization.
- **Security**: Implements JSON Web Signatures (JWS) for secure data handling.
- **Documentation**: Integrated Swagger UI (`swagger-ui-dist`) for API exploration.
- **Configuration**: Environment variable management using `dotenv`.
- **Middleware**: Cross-Origin Resource Sharing (CORS) enabled.

## Prerequisites

- Node.js
- MongoDB

## Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

This project requires environment variables to be set. Create a `.env` file in the root directory:

```env
DB_URL=mongodb://localhost:27017/ecom_db
```

## Database

The application connects to MongoDB using the official driver.

### Initialization

Upon connection, the application automatically:

- Initializes a `counters` collection for generating unique IDs (e.g., `cartItemId`).
- Creates indexes on the `products` collection for optimized querying:
  - `price` (Ascending)
  - `name` (Ascending) and `category` (Descending)
  - `desc` (Text index for search)

## API Endpoints

The API provides endpoints for user management, product catalog, and customer orders. Some routes require a valid JSON Web Token (JWT) for access.

### User / Auth

- `POST /api/users/signup`: Register a new user account.
- `POST /api/users/signin`: Log in to receive a JWT.

### Products

- `GET /api/products`: Retrieve a list of all products. Supports filtering by category, searching by description, and sorting by price.
- `GET /api/products/:id`: Get details for a single product.

### Cart (Protected)

- `GET /api/cart`: View items in the current user's cart.
- `POST /api/cart`: Add a product to the cart.
- `DELETE /api/cart/:cartItemId`: Remove an item from the cart.

### Orders (Protected)

- `POST /api/orders`: Place an order using items from the cart.

## Running the Project

```bash
npm start
```
