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
