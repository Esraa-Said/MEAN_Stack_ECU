# 🌐 Node.js `http` Module 

The `http` module in Node.js is a **built in module** that allows you to create a web server and handle HTTP requests/responses **without using any external packages** like Express.

---

## 📦 How to Use It

```js
const http = require("http");
```

---

## 🧠 How HTTP Server Works

1. **Client** (Browser/Postman) sends an HTTP request.
2. The Node server receives it via `http.createServer()`
3. You write logic to handle `req` (request) and send back `res` (response).
4. The server listens on a specific **port** (e.g., 3000).

---

## 🛠️ Basic HTTP Server

```js
const http = require("http");

const server = http.createServer((req, res) => {
  // no end
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
```

```js
const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Hello, World!");
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
```

```js
const http = require("http");

const server = http.createServer((req, res) => {
  res.write("Hello World!");
  res.end();
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
```

---

## 📥 Request Object (`req`)

You can access:

- `req.url` → The path (e.g., `/about`)
- `req.method` → HTTP method (GET, POST, etc.)
- `req.headers` → All request headers

```js
const server = http.createServer((req, res) => {
  console.log(req.method, req.url);
});
```

---

## 📤 Response Object (`res`)

You use it to respond to the client:

- `res.writeHead(statusCode, headers)`
- `res.write(data)` → (optional)
- `res.end(data)` → Ends response

---

```js
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("<h1>Hello World</h1>");
});

server.listen(3000, () => {
  console.log("Server running at port 3000");
});
```

```js
const http = require("http");

const server = http.createServer((req, res) => {
  const data = { name: "Esraa", role: "Instructor" };

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
});

server.listen(3000, () => {
  console.log("Server running at port 3000");
});
```

## 🧪 Routing Example (Manual)

```js
const http = require("http");

const server = http.createServer((req, res) => {
  const { url, method } = req;

  if (url === "/" && method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Home Page</h1>");
  } else if (url === "/about" && method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>About Page</h1>");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(3000, () =>
  console.log("Server running on http://localhost:3000")
);
```


---

```js
const http = require("http");
const fs = require("fs");

const home = fs.readFileSync("./home.html", "utf-8");

const server = http.createServer((req, res) => {
  const { url, method } = req;
  if (url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(home);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server running at port 3000");
});
```
---

## 🧾 Handle JSON Request Body

```js
const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/data") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const parsed = JSON.parse(body);
      console.log(parsed);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Data received" }));
    });
  }
});
```
---
## Download `postman`
```bash
https://www.postman.com/downloads/
```



---

## ✅ Summary Table

| Concept         | Description                               |
| --------------- | ----------------------------------------- |
| `createServer`  | Creates HTTP server                       |
| `req.url`       | Path of request                           |
| `req.method`    | GET / POST / PUT / DELETE                 |
| `res.writeHead` | Sets status and headers                   |
| `res.end()`     | Sends final response and ends the request |
| Manual Routing  | if-else or switch(req.url)                |

---

## ✅ When to Use http Module Directly?

- Small internal tools
- Educational use
- When you don’t want external dependencies

For production, use Express.js instead for easier routing, middleware, and scalability.

---
