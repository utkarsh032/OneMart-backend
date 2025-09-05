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
