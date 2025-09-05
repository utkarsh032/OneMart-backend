## 🔐 Authentication

This section covers user registration and login endpoints for the application.

---

### **1️⃣ Register a New User**

**Endpoint:**  
`POST /api/auth/register`

**Request Body Example:**

```json
{
  "name": "Utkarsh Raj",
  "email": "utkarshraj525@gmail.com",
  "password": "pass****word"
}
```

### 2️⃣ Login User

**Endpoint:**
`POST /api/auth/login`

**Request Body Example:**

```json
{
  "email": "utkarshraj525@gmail.com",
  "password": "pass****word"
}
```

## 🛒 Product API

This section covers all product-related endpoints.

---

### **1️⃣ Create Product**

**Endpoint:**
`POST /api/product/add`

**Request Body Example:**

```json
{
  "name": "Product Name",
  "description": "Detailed description of the product",
  "price": 1999,
  "stock": 50,
  "category": "Electronics",
  "brand": "Brand Name",
  "images": ["image1.jpg", "image2.jpg"]
}
```

### **2️⃣ Get All Products**

**Endpoint:**
`GET /api/product/`

### **3️⃣Get Product by ID**

**Endpoint:**
`GET /api/product/:id`

### **4️⃣ Update Product by ID**

**Endpoint:**
`PATCH /api/product/:id`

### **5️⃣ Delete Product by ID**

**Endpoint:**
`DELETE /api/product/:id`

## 🛒 Order API

| Method | Endpoint                 | Description                          |
| ------ | ------------------------ | ------------------------------------ |
| POST   | `/api/orders`            | Create a new order                   |
| GET    | `/api/orders/my`         | Get all orders of the logged-in user |
| GET    | `/api/orders/:id`        | Get order details by order ID        |
| PUT    | `/api/orders/:id/pay`    | Mark an order as paid                |
| PUT    | `/api/orders/:id/status` | Update the status of an order        |

> 🔒 **Note:** All routes require authentication (`protect` middleware).

---

### **1️⃣ Create Order**

**Endpoint:**  
`POST /api/orders`

**Request Body Example:**

```json
{
  "orderItems": [
    {
      "product": "64f1a5b3c2a1f9e8d1234568",
      "qty": 2,
      "price": 499
    },
    {
      "product": "64f1a5b3c2a1f9e8d1234569",
      "qty": 1,
      "price": 899
    }
  ],
  "shippingAddress": {
    "address": "123 MG Road",
    "city": "Mumbai",
    "state": "Maharashtra",
    "postalCode": "400001",
    "country": "India"
  },
  "totalAmount": 1897
}
```

### **2️⃣ Get Logged-in User Orders**

**Endpoint:**
`GET /api/orders/my`

### **3️⃣ Get Order By ID**

**Endpoint:**
`GET /api/orders/:id`

### **4️⃣ Mark Order As Paid**

**Endpoint:**
`PUT /api/orders/:id/pay`

## **5️⃣ Update Order Status**

**Endpoint:**
`PUT /api/orders/:id/status`

## 🛒 Cart API

This section covers the Cart functionality: adding items, removing items, and fetching the cart for a user. All routes require authentication.

---

### **1️⃣ Add Item to Cart**

**Endpoint:**  
`POST /api/cart/add`

**Headers:**

```json
{
  "productId": "64f1a5b3c2a1f9e8d1234568",
  "quantity": 2,
  "priceAtAdd": 499.99
}
```

### **2️⃣ Remove Item from Cart**

`POST /api/cart/remove`

```json
{
  "productId": "64f1a5b3c2a1f9e8d1234568"
}
```

### **3️⃣ Get Cart for User**

`GET /api/cart`

## 💖 Wishlist API

This section covers the Wishlist functionality: adding items, removing items, and fetching the wishlist for a user.  
**All routes require authentication via JWT token.**

---

### **1️⃣ Add Item to Wishlist**

**Endpoint:**  
`POST /api/wishlist/add`

**Headers:**

```json
{
  "productId": "64f1a5b3c2a1f9e8d1234568"
}
```

### **2️⃣ Remove Item from Wishlist**

**Endpoint:**
`POST /api/wishlist/remove`

### **3️⃣ Get Wishlist for User**

**Endpoint:**
`GET /api/wishlist`
