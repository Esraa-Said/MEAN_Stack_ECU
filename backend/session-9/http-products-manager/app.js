const http = require("http");
const url = require("url");

let products = [
  { id: 1, productName: "Product 1", price: 1000 },
  { id: 2, productName: "Product 2", price: 2000 },
  { id: 3, productName: "Product 3", price: 5000 },
];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method;
  const pathname = parsedUrl.pathname;

  // GET all products
  if (method === "GET" && pathname === "/api/products") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  }

  // GET product by ID
  else if (method === "GET" && pathname.startsWith("/api/products/")) {
    const id = +pathname.split("/").pop();
    const product = products.find((p) => p.id === id);
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Product Not Found" }));
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(product));
  }

  // POST new product
  else if (method === "POST" && pathname === "/api/products") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const data = JSON.parse(body);
      if (!data.productName || !data.price) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Missing productName or price" }));
      }
      const newProduct = {
        id: products.length + 1,
        ...data,
      };
      products.push(newProduct);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product added", product: newProduct }));
    });
  }

  // PATCH update product
  else if (method === "PATCH" && pathname.startsWith("/api/products/")) {
    const id = +pathname.split("/").pop();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Product Not Found" }));
    }

    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const data = JSON.parse(body);
      products[index] = { ...products[index], ...data };
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product updated", product: products[index] }));
    });
  }

  // DELETE product
  else if (method === "DELETE" && pathname.startsWith("/api/products/")) {
    const id = +pathname.split("/").pop();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Product Not Found" }));
    }

    const deleted = products.splice(index, 1);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Product deleted", product: deleted[0] }));
  }

  // Not Found
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route Not Found" }));
  }
});

server.listen(3000, () => {
  console.log("HTTP server running at http://localhost:3000");
});
