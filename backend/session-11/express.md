# 🚀 Express.js 

`Express.js` is a **fast**, **unopinionated**, and **minimalist** web framework for Node.js that simplifies the process of building web applications and APIs.

---

## 🔍 Why Use Express.js?

Node's built-in `http` module is low-level. Express builds on top of it and provides:

✅ Simple routing system  
✅ Middleware support  
✅ Easy request/response handling  
✅ Readable code structure  
✅ Scalability for APIs & full apps

---

## 📦 Installation

```bash
npm install express
```

Then in your JS file:

```js
const express = require('express');
const app = express();
```

---

## 🧠 How It Works Internally

- Express wraps the core `http` module under the hood.
- You define **routes** (URLs) and **handlers** (functions).
- Middleware functions are used to **manipulate** the request/response cycle.
- It supports dynamic routing, REST APIs, templating, static files, and more.

---

## 🔁 Basic Structure

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
```

---

## 📥 Handling Requests

Express has built-in methods for all HTTP verbs:

```js
app.get('/about', (req, res) => { ... });   // GET
app.post('/data', (req, res) => { ... });   // POST
app.put('/edit/:id', (req, res) => { ... }); // PUT
app.delete('/delete/:id', (req, res) => { ... }); // DELETE
```

---

## 📂 Routing Parameters

```js
app.get('/user/:id', (req, res) => {
  res.send(`User ID: ${req.params.id}`);
});
```
```bash
http://localhost:3000/user/10
```

---

## 🔗 Query Parameters

```js
app.get('/search', (req, res) => {
  res.send(`You searched for: ${req.query.q}`);
});
```
```bash
http://localhost:3000/search?q=book
```

---

## 🧱 Middleware in Express

Middleware are functions that run **before reaching the route**.

```js
app.use((req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next(); // pass to next middleware/route
});
```

Built-in middleware:
- `express.json()` → Parses JSON request body

```js
app.use(express.json());
```

---

## 📦 Static Files

To serve static assets like images, CSS, JS:

```js
app.use(express.static('public'));
```

Now `public/style.css` is available at `http://localhost:3000/style.css`

---

## 🧾 Sending Different Responses

```js
res.send("Plain text");
res.json({ name: "Esraa", age: 25 });
res.sendFile(__dirname + "/index.html");
res.status(404).send("Not Found");
```

---

## 🧠 Express vs http module

| Feature            | `http` module       | `Express`              |
|--------------------|---------------------|-------------------------|
| Routing            | Manual (`if`, `switch`) | Built-in               |
| Middleware         | Manual              | Built-in (easy)         |
| JSON parsing       | Manual (events)     | Built-in (`express.json()`) |
| File serving       | Manual              | `express.static()`      |
| Readability        | Low                 | High (clean)            |

---

## 🧠 Real World Uses of Express

- REST APIs for frontend apps
- Admin dashboards
- User authentication systems
- Payment APIs
- Chat server backends
- Upload/download file handling

---

## 🧪 Example: REST API

```js
const express = require('express');
const app = express();

app.use(express.json());

let users = [{ id: 1, name: "Esraa" }];

app.get('/users', (req, res) => res.json(users));

app.post('/users', (req, res) => {
  users.push(req.body);
  res.status(201).json({ msg: "User added" });
});

app.listen(3000, () => console.log("API running"));
```

---

## 🧠 Summary

| Concept           | Purpose                                      |
|-------------------|----------------------------------------------|
| `app.use()`       | Use middleware                               |
| `app.get()`       | Handle GET request                           |
| `req.params`      | Route parameters                             |
| `req.query`       | Query string params                          |
| `req.body`        | POSTed data (with `express.json()`)          |
| `res.send()`      | Send text/html/JSON                          |
| `res.status()`    | Set HTTP status code                         |
| `express.static()`| Serve static files                           |

---

## ✅ Why It's Great for Teaching/Real Apps

- Fast prototyping
- Excellent documentation
- Large community
- Works well with MongoDB, MySQL, JWT, file uploads