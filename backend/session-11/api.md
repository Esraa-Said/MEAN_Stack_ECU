# Application Programming Interface [API]

## 🔷 What is an API?

**API** stands for **Application Programming Interface**. It is a **set of rules** and **protocols** that allows two software applications to **communicate** with each other.

## 🔌 Real-World Analogy

Imagine you're at a restaurant:

- You are the **client**
- The kitchen is the **server**
- The waiter is the **API**
  You (client) give your order (request) to the waiter (API). The waiter takes it to the kitchen (server), the kitchen prepares the food (response), and the waiter brings it back to you.

## 📦 REST API

- REST = **REpresentational State Transfer**

### ✅ HTTP Methods in REST

| Method | Purpose | Example | 
| --- | --- | --- | 
| GET | Read data | `GET /users` (get all users) |
| POST | Create data | `POST /users` (create user) | 
| PUT | Update data | `PUT /users/1` (update user 1) | 
| DELETE | Delete data | `DELETE /users/1` |

---

🧩 1. **Client-Server Architecture** 
* **Separation of concerns**: The frontend (client) and backend (server) are **independent**. 
* Example: You can build a mobile app or a web app that consumes the **same REST API.**
**Benefits**: 
* Easier to scale 
* Backend and frontend can evolve independently

🚫 2. **Statelessness**  
* Each **request from the client** to the server must contain **all the information needed** to process the request. 
* The server **does not store any state** (session) between requests.
```http
❌ No session-based login info stored on server
✅ Each request contains auth token, etc.
```

📦 3. **Cacheability**  
* Responses must **explicitly indicate** whether they are **cacheable or not**. 
* Allows clients/intermediaries to **cache** responses to improve performance. 


🔗 4. **Uniform Interface** 
This is the **core principle** that separates REST from other styles. It means all interactions between client and server must follow a **standardized approach**. Key rules:
* **Resource-Based**: Use nouns (not verbs) in URLs 
    * `/users`, `/products`, `/orders/123` 
* **Standard Methods**: Use HTTP methods properly 
    * `GET`, `POST`, `PUT`, `DELETE`, `PATCH` 
* **Representation**: Resources can be represented in JSON, XML, etc. 

🛣️ 5. **Layered System**  
* The API architecture can have **multiple layers** (security, load balancer, cache, server). 
* The client does not know whether it is connected to the **actual server** or an **intermediate layer**.
**Example**: 
    * You might have: 
    * Firewall 
    * Caching proxy 
    * API gateway 
    * App server 
    * DB server

🧠 6. **Code on Demand (Optional)**  
* The server can optionally send **code (like JavaScript)** that the client executes. 
* Rarely used in REST APIs, but it’s part of the original REST constraints.


```js
const express = require('express');
const app = express();

app.use(express.json()); // to parse JSON body

// Simulated database
let users = [
  { id: 1, name: "Esraa" },
  { id: 2, name: "Ali" }
];

// GET all users
app.get('/users', (req, res) => {
  res.json(users);
});

// GET single user
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  user ? res.json(user) : res.status(404).send('User not found');
});

// POST create user
app.post('/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT update user
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  user.name = req.body.name;
  res.json(user);
});

// DELETE user
app.delete('/users/:id', (req, res) => {
  users = users.filter(u => u.id !== parseInt(req.params.id));
  res.status(204).send();
});

app.listen(3000, () => console.log('API running on port 3000'));
```