const http = require("http");
const url = require("url");
const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "products.json");

// ✅ Read body helper
function getBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

// ✅ Read products from file
async function getProducts() {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// ✅ Save products to file
async function saveProducts(products) {
  await fs.writeFile(filePath, JSON.stringify(products, null, 2));
}

// ✅ Server handler
const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true);
  const method = req.method;
  const pathname = parsed.pathname;

  res.setHeader("Content-Type", "application/json");

  // 🔹 Get all products
  if (method === "GET" && pathname === "/products") {
    const products = await getProducts();
    return res.end(JSON.stringify(products));
  }

  // 🔹 Add new product
  if (method === "POST" && pathname === "/products") {
    const body = await getBody(req);
    try {
      const newProduct = JSON.parse(body);
      const products = await getProducts();
      const maxId =
        products.length > 0 ? Math.max(...products.map((p) => p.id)) : 0;
      newProduct.id = maxId + 1;
      products.push(newProduct);
      await saveProducts(products);
      res.writeHead(201);
      return res.end(JSON.stringify(newProduct));
    } catch {
      res.writeHead(400);
      return res.end(JSON.stringify({ error: "Invalid JSON" }));
    }
  }

  // 🔹 Delete product
  if (method === "DELETE" && pathname.startsWith("/products/")) {
    const id = parseInt(pathname.split("/")[2]);
    const products = await getProducts();
    const updated = products.filter((p) => p.id !== id);

    if (updated.length === products.length) {
      res.writeHead(404);
      return res.end(JSON.stringify({ error: "Product not found" }));
    }

    await saveProducts(updated);
    return res.end(JSON.stringify({ message: "Product deleted" }));
  }

  // 🔹 Not found
  res.writeHead(404);
  res.end(JSON.stringify({ error: "Not Found" }));
});

// ✅ Start server
server.listen(3000, () => {
  console.log("🟢 Server running at http://localhost:3000");
});
