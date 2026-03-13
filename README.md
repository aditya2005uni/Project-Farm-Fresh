# FramFresh Backend

## Overview

FramFresh is a backend API for an e-commerce style platform where users can browse products, add them to a cart, and place orders. It also includes admin functionality for managing products.

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

## Features

* User registration and login
* JWT-based authentication
* Product listing
* Add/remove items from cart
* Place and view orders
* Admin product management

## Project Structure

controllers/ → Business logic
models/ → MongoDB schemas
routes/ → API routes
middleware/ → Authentication and admin checks
db/ → Database connection

## Installation

1. Clone the repository
2. Install dependencies

npm install

3. Add `.env` file

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret

4. Run the server

npm start
