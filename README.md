# E-Commerce API

A RESTful API for an E-Commerce application.

## Features

- **User Management**: Sign up and Sign in functionality with JWT authentication.
- **Product Management**: Browse products and add new products with image upload support.
- **Cart Management**: Add items to cart and view cart contents.
- **API Documentation**: Integrated Swagger UI for easy API exploration.

## Prerequisites

- Node.js
- npm

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the server:

   ```bash
   node server.js
   ```

   The server runs on `http://localhost:3200`.

2. Access the API documentation:
   Open your browser and navigate to `http://localhost:3200/api-docs`.

## Dependencies

- `express`: Web framework.
- `jsonwebtoken`: For secure authentication.
- `multer`: For handling file uploads (product images).
- `swagger-ui-express`: For API documentation.
- `express-validator`: For input validation.
