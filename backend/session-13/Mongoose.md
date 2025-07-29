
# 🧠 Mongoose 

**Mongoose** is an **Object Data Modeling (ODM)** library for **MongoDB** and **Node.js**. 
### 🔍 What is ODM? 
ODM allows you to write **JavaScript code** that interacts with your MongoDB database in an organized and structured way
> While you can use the native **MongoDB driver**, Mongoose provides **additional functionality** that makes working with data **faster, safer, and easier**.

### 🚀 Why Use Mongoose? 
* ✅ Cleaner and simpler code for interacting with MongoDB 
* ✅ Provides a schema-based structure for documents 
* ✅ Includes built-in features like validation, hooks (middleware), and query helpers

### 🧩 Key Features 
* **Schema-based Modeling** Define the structure of your documents including: 
* Field types 
* Default values 
* Required fields 
* Validation rules

* **Model Creation** 
Schemas are used to create **Models**, which represent MongoDB collections and allow you to perform **CRUD operations** easily. 
* **Data Validation** Enforces rules before saving data to the database.

* **Simple Query API** 
Intuitive methods like `.find()`, `.findById()`, `.updateOne()`, etc. 
* **Middleware (Hooks)** Run logic before or after actions like saving, updating, or deleting documents.

## ✅ Setup

### 1. Install Mongoose
```bash
npm install mongoose
```

### 2. Connect to MongoDB Atlas
```js
const mongoose = require("mongoose");

mongoose.connect("YOUR_URI")
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Connection Error", err));
```

---

## 🧱 Create Schema & Model

```js
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  inStock: { type: Boolean, default: true }
});

const Product = mongoose.model("Product", productSchema);
```

---

## 🔁 CRUD Operations

### 🔹 Insert
```js
await Product.create({ name: "Phone", price: 3000 });
```

### 🔹 Read
```js
const items = await Product.find();
```

### 🔹 Update
```js
await Product.findByIdAndUpdate(id, { price: 3500 }, { new: true });
```

### 🔹 Delete
```js
await Product.findByIdAndDelete(id);
```

---

## 🧠 Populate and Relationships

```js
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

Order.find().populate("user").then(data => console.log(data));
```

---

## 🛡 Tips for Atlas

- Use correct Atlas URI.
- Enable IP Access from your device.
- Allow connection from all IPs for testing: `0.0.0.0/0`.

---

## ✅ Summary

| Task    | Mongoose Function         |
|---------|---------------------------|
| Insert  | `create()`                |
| Read    | `find()`                  |
| Update  | `findByIdAndUpdate()`     |
| Delete  | `findByIdAndDelete()`     |
| Relations | `populate()`            |
