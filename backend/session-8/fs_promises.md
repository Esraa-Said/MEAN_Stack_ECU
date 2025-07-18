# 📁 Node.js File System (fs.promises) — Modern Way

The `fs` module in Node.js allows you to interact with the file system: read, write, delete, rename, and manage files and folders.

In this guide, we focus on the **modern async/await approach using `fs.promises`** — which is the **recommended way** in real-world applications.

---

## 📌 Getting Started

Import the `fs/promises` module:

```js
const fs = require("fs").promises;
```

All operations will now use `async/await` syntax for better readability and control.

---

## ✨ Common Operations (Modern Way)

### 1. 📄 Reading Files

```js
const data = await fs.readFile("example.txt", "utf8");
console.log(data);
```

### 2. ✏️ Writing Files

```js
await fs.writeFile("file.txt", "Hello from fs.promises!");
```

### 3. ➕ Appending to Files

```js
await fs.appendFile("file.txt", "\nAppended text using async!");
```

### 4. 🗑️ Deleting Files

```js
await fs.unlink("file.txt");
```

### 5. 🔄 Renaming Files

```js
await fs.rename("old.txt", "new.txt");
```

### 6. 📂 Creating Folders

```js
await fs.mkdir("myFolder");
```

### 7. 📁 Reading Directory Contents

```js
const files = await fs.readdir(".");
console.log(files);
```

### 8. ✅ Check if File Exists

Use `fs.access()` instead of `existsSync()`:

```js
try {
  await fs.access("file.txt");
  console.log("✅ File exists");
} catch {
  console.log("❌ File does not exist");
}
```

---

## 🧠 Summary Table (Modern)

| Task           | Method                         |
|----------------|--------------------------------|
| Read File      | `await fs.readFile()`          |
| Write File     | `await fs.writeFile()`         |
| Append File    | `await fs.appendFile()`        |
| Delete File    | `await fs.unlink()`            |
| Rename File    | `await fs.rename()`            |
| Create Folder  | `await fs.mkdir()`             |
| Read Directory | `await fs.readdir()`           |
| Check Exists   | `await fs.access()`            |

---

##  Old Methods (Not Preferred)

Node.js also supports the older ways using:
- ✅ `fs.readFileSync()` / `fs.readFile()` (callback-based)
- ✅ `fs.writeFileSync()` / `fs.writeFile()` (callback-based)

But we recommend using `fs.promises` because:
- It works better with modern JavaScript
- It's cleaner, easier to debug, and more scalable

---

## 🗂️ Folder Structure Example

```bash
user-management/
│
├── app.js                 # Main app
├── utils/
│   ├── userService.js     # File operations (read, write)
│   └── logger.js          # Custom logger
└── data/
    └── users.json         # Fake DB
```

---

## 💡 Sample Code: User Service with fs.promises

### ✅ `users.json`

```json
[{ "id": 1, "name": "Esraa", "email": "esraa@mail.com" }]
```

### ✅ `logger.js`

```js
function log(message) {
  const now = new Date().toISOString();
  console.log(`[${now}] ${message}`);
}

module.exports = log;
```

### ✅ `userService.js`

```js
const fs = require("fs").promises;
const path = require("path");
const log = require("./logger");

const filePath = path.join(__dirname, "../data/users.json");

async function loadUsers() {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveUsers(users) {
  await fs.writeFile(filePath, JSON.stringify(users, null, 2));
}

// Add User
async function addUser(name, email) {
  const users = await loadUsers();
  const maxId = users.length > 0 ? Math.max(...users.map(u => u.id)) : 0;
  const newUser = { id: maxId + 1, name, email };
  users.push(newUser);
  await saveUsers(users);
  log(`✅ User added: ${name}`);
}

// Remove User
async function removeUser(id) {
  let users = await loadUsers();
  const newUsers = users.filter((u) => u.id !== id);
  if (users.length === newUsers.length) {
    log(`❌ User with ID ${id} not found`);
    return;
  }
  await saveUsers(newUsers);
  log(`🗑️ User with ID ${id} removed`);
}

// List Users
async function listUsers() {
  const users = await loadUsers();
  log("👥 Users List:");
  users.forEach((u) => console.log(`- ${u.id}: ${u.name} (${u.email})`));
}

module.exports = { addUser, removeUser, listUsers };
```

### ✅ `app.js`

```js
const userService = require("./utils/userService");

async function main() {
  await userService.addUser("Salma", "salma@mail.com");
  await userService.addUser("Mohamed", "mohamed@mail.com");
  await userService.listUsers();
  await userService.removeUser(1);
  await userService.listUsers();
}

main();
```

---

## 🏁 Run the App

```bash
node app.js
```
