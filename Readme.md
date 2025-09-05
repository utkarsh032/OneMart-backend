# 🛒 OneMart E-Commerce Backend : [Link](https://onemart-backend-exl9.onrender.com)

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/atlas)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A **production-ready, scalable backend** for an advanced E-Commerce application in **Backend**. This project demonstrates enterprise-level architecture with secure authentication, real-time features, payment workflows, and comprehensive analytics.

## 📋 Table of Contents

- [✨ Key Features](#-key-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ Architecture](#️-architecture)
- [📂 Project Structure](#-project-structure)
- [🚀 Quick Start](#-quick-start)
- [🔑 API Documentation](#-api-documentation)
- [🔒 Security Features](#-security-features)
- [📊 Analytics & Monitoring](#-analytics--monitoring)
- [🌐 Deployment](#-deployment)
- [🧪 Testing](#-testing)
- [📝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Key Features

### 🔐 **Authentication & Authorization**

- JWT-based authentication with refresh tokens
- Role-based access control (`user`, `admin`)
- Password hashing with bcrypt

### 📦 **Product Management**

- Complete CRUD operations with admin controls
- Advanced search & filtering (price, category, brand, ratings)
- Inventory management with low-stock alerts
- Product categories and subcategories
- Ratings & Reviews system with moderation

### 🛍️ **Order Management**

- Multi-step checkout process
- Cart management with session persistence
- Order status tracking (`pending`, `processing`, `shipped`, `delivered`, `cancelled`)
- Order history with detailed analytics

### 💳 **Payment Integration**

- Multiple payment methods (COD, Card, UPI, Wallet, Bank Transfer)
- Transaction status tracking

### 📊 **Advanced Analytics**

- Real-time dashboard metrics
- Customer behavior analysis
- Inventory insights
- Revenue forecasting

### 🔔 **Real-time Features**

- Live order notifications via WebSocket
- Real-time inventory updates
- Admin notification system
- Customer support chat (ready for integration)

---

## 🛠️ Tech Stack

| Category           | Technologies                                                                                                                                                                                          |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Runtime**        | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white) |
| **Database**       | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white) ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat&logo=mongoose&logoColor=white)    |
| **Authentication** | ![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white) ![bcrypt](https://img.shields.io/badge/bcrypt-blue?style=flat)                                          |
| **Cloud**          | ![MongoDB Atlas](https://img.shields.io/badge/MongoDB%20Atlas-47A248?style=flat&logo=mongodb&logoColor=white)                                                                                         |

---

## 🏗️ Architecture

```mermaid
graph TB
    A[Client Applications] --> B[Load Balancer]
    B --> C[Express Server]
    C --> D[Authentication Middleware]
    C --> E[Route Controllers]
    E --> F[Business Logic Layer]
    F --> G[Data Access Layer]
    G --> H[(MongoDB Atlas)]
    F --> L[Payment Gateway]
    F --> M[Email Service]
    F --> N[File Storage]
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18+ recommended)
- **MongoDB Atlas** account or local MongoDB instance
- **Redis** (optional, for caching)
- **Git**

### Installation

1. **Clone the repository**

   ```bash
   git clone git@github.com:utkarsh032/OneMart-backend.git
   cd ecommerce-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**

   Copy the example environment file:

   ```bash
   .env
   ```

   Configure your environment variables:

   ```env
   # Server Configuration
   MONGO_URL='mongodb+srv:************************/onemart'
   PORT=3000
   JWT_SECRET='ONEMART_SECRET_KEY'

   # Database
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/onemart
   ```

4. **Start the development server**

   ```bash
   # Development mode with hot reload
   npm run dev

   # Production mode
   npm start
   ```

5. **Verify installation**
   ```bash
   curl http://localhost:3000/
   ```

---

## 🔑 API Documentation

### Base URL

```
http://localhost:3000
```

# 📌 API Endpoints Overview

## 🔐 Authentication API

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/register` | Register new user |
| POST   | `/api/auth/login`    | Login user        |

---

## 🛒 Product API

| Method | Endpoint           | Description            |
| ------ | ------------------ | ---------------------- |
| POST   | `/api/product/add` | Create product (Admin) |
| GET    | `/api/product/`    | Get all products       |
| GET    | `/api/product/:id` | Get product by ID      |
| PATCH  | `/api/product/:id` | Update product by ID   |
| DELETE | `/api/product/:id` | Delete product by ID   |

---

## 📦 Order API

| Method | Endpoint                 | Description                 |
| ------ | ------------------------ | --------------------------- |
| POST   | `/api/orders`            | Create new order            |
| GET    | `/api/orders/my`         | Get logged-in user orders   |
| GET    | `/api/orders/:id`        | Get order details by ID     |
| PUT    | `/api/orders/:id/pay`    | Mark order as paid          |
| PUT    | `/api/orders/:id/status` | Update order status (Admin) |

---

## 🛒 Cart API

| Method | Endpoint           | Description           |
| ------ | ------------------ | --------------------- |
| POST   | `/api/cart/add`    | Add item to cart      |
| POST   | `/api/cart/remove` | Remove item from cart |
| GET    | `/api/cart`        | Get cart for user     |

---

## 💖 Wishlist API

| Method | Endpoint               | Description               |
| ------ | ---------------------- | ------------------------- |
| POST   | `/api/wishlist/add`    | Add item to wishlist      |
| POST   | `/api/wishlist/remove` | Remove item from wishlist |
| GET    | `/api/wishlist`        | Get wishlist for user     |

---

## 💳 Transaction / Payment API

| Method | Endpoint                      | Description           |
| ------ | ----------------------------- | --------------------- |
| POST   | `/api/transaction/`           | Create a payment      |
| PUT    | `/api/transaction/:id/status` | Update payment status |

---

## 📊 Analytics API (Admin Only)

| Method | Endpoint                       | Description     |
| ------ | ------------------------------ | --------------- |
| GET    | `/api/analytics/summary`       | Sales summary   |
| GET    | `/api/analytics/sales/monthly` | Monthly revenue |
| GET    | `/api/analytics/top-products`  | Top products    |
| GET    | `/api/analytics/top-customers` | Top customers   |

## 👨‍💻 Developer

**Utkarsh Raj**

- **GitHub**: [@utkarsh032](https://github.com/utkarsh032)
- **Email**: utkarshraj525@gmail.com
- **LinkedIn**: [Connect with me](https://linkedin.com/in/utkarsh-raj032official)
