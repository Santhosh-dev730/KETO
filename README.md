# 📱 Keto - E-commerce Admin and User Management System

Keto is a full-stack e-commerce application designed for managing and purchasing electronic devices such as smartphones and tablets. It includes powerful admin tools and a smooth shopping experience for users.

---

## 🔧 Features

### 🔑 Admin Panel

- ✅ **CRUD Operations on Products** – Add, edit, delete, and list products
- ✅ **Manage Users** – View, update, or remove registered users
- ✅ **View Orders** – Track and manage all product orders

### 🛍️ User Panel

- ✅ **Sign Up / Login** – Register or sign in to access shopping features
- ✅ **Product Listing** – View available electronic products
- ✅ **Add to Cart** – Only available **after login**
- ✅ **Shipping Address** – Save delivery address details
- ✅ **Order Summary** – View items, pricing, tax, and totals
- ✅ **Place Order** – Confirm and finalize purchases

---

## 🔐 Authentication Flow

1. **User Sign Up**
   - Registers with email and password
   - Data stored securely in MongoDB
2. **User Login**
   - Authenticates using credentials
3. **Add to Cart**
   - Only available if user is logged in
4. **Logout**
   - Clears the session and cart data

---


## 🚀 Getting Started

### Prerequisites
- React 
- Node.js 
- Express
- MongoDB (local)

### Installation Steps

```bash
# Clone the repo
git clone https://github.com/your-username/keto.git
cd keto

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd frontend
npm install

**create .env file in backend folder** 
MONGO_URI=your_mongodb_url
PORT=7000

### Run the App 
# Start the backend
cd backend
node index.js

# Start the frontend
cd frontend
npm run dev


