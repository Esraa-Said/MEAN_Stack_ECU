# 📁 Node.js File System (fs) Module

The `fs` module in Node.js allows you to work with the file system, such as reading, writing, creating, deleting, and managing files and folders.

---

## 📌 How to Use

Import the `fs` module:

```js
const fs = require("fs");
```

---

## 🔹 Sync vs Async Methods

| Type  | Description                            | Example             |
| ----- | -------------------------------------- | ------------------- |
| Sync  | Blocking, waits for the task to finish | `fs.readFileSync()` |
| Async | Non-blocking, uses callbacks/promises  | `fs.readFile()`     |

---

## 📖 Common Operations

### 1. 📄 Reading Files

#### Synchronous:

```js
const data = fs.readFileSync("example.txt", "utf8");
console.log(data);
```

#### Asynchronous:

```js
fs.readFile("example.txt", "utf8", (err, data) => {
  if (err) return console.error(err.message);
  else console.log(data);
});
```

---

### 2. ✏️ Writing Files

#### Synchronous:

```js
fs.writeFileSync("file.txt", "Hello Node!");
```

#### Asynchronous:

```js
fs.writeFile("file.txt", "Hello Async!", (err) => {
  if (err) console.log(err);
});
```

---

### 3. ➕ Appending to Files

```js
fs.appendFileSync("file.txt", "\nAppended text.");
```

```js
fs.appendFile("file.txt", "\nMore text.", (err) => {
 if (err) console.log(err);
});
```

---

### 4. 🗑️ Deleting Files

```js
fs.unlinkSync("file.txt");
```

```js
fs.unlink("file.txt", (err) => {
  if (err) console.log(err);
});
```

---

### 5. 🔄 Renaming Files

```js
fs.renameSync("old.txt", "new.txt");
```

```js
fs.rename("old.txt", "new.txt", (err) => {
  if (err) console.log(err);
});
```

---

### 6. 📂 Creating Folders

```js
fs.mkdirSync("myFolder");
```

```js
fs.mkdir("myFolder", (err) => {
  if (err) console.log(err);
});
```

---

### 7. 📁 Reading Directory Contents

```js
const files = fs.readdirSync(".");
console.log(files);
```

```js
fs.readdir(".", (err, files) => {
  if (err) throw err;
  console.log(files);
});
```

---

### 8. ✅ Check if File Exists

```js
if (fs.existsSync("file.txt")) {
  console.log("File exists!");
}
```

---

## 🔄 fs.promises (Modern Async)

```js
const fsPromises = require("fs").promises;

async function readFile() {
  try {
    const data = await fsPromises.readFile("file.txt", "utf8");
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

readFile();
```

---

## 🧠 Summary Table

| Task           | Sync Method      | Async Method           |
| -------------- | ---------------- | ---------------------- |
| Read File      | `readFileSync`   | `readFile`             |
| Write File     | `writeFileSync`  | `writeFile`            |
| Append File    | `appendFileSync` | `appendFile`           |
| Delete File    | `unlinkSync`     | `unlink`               |
| Rename File    | `renameSync`     | `rename`               |
| Create Folder  | `mkdirSync`      | `mkdir`                |
| Read Directory | `readdirSync`    | `readdir`              |
| Check Exists   | `existsSync`     | `fs.access()` (modern) |

---

### 📁 Folder Structure Example

```lua
user-management/
│
├── app.js                 # Main entry point
├── utils/
│   ├── userService.js     # Logic for adding/removing users
│   └── logger.js          # Logs actions
└── data/
    └── users.json         # Stores users
```

#### ✅ 1. `users.json` — Simulate a Database

```json
[{ "id": 1, "name": "Esraa", "email": "esraa@mail.com" }]
```

#### ✅ 2. logger.js — Local Module for Logging

```js
function log(message) {
  const now = new Date().toISOString();
  console.log(`[${now}] ${message}`);
}

module.exports = log;
```

#### ✅ 3. userService.js — Logic Module

```js
const fs = require("fs");
const path = require("path");
const log = require("./logger");

const filePath = path.join(__dirname, "../data/users.json");

// Helper to load users
function loadUsers() {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

// Helper to save users
function saveUsers(users) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

// Add new user
function addUser(name, email) {
  const users = loadUsers();
  const newUser = {
    id: users.length + 1,
    name,
    email,
  };
  users.push(newUser);
  saveUsers(users);
  log(`User added: ${name}`);
}

// Remove user by ID
function removeUser(id) {
  let users = loadUsers();
  const originalLength = users.length;
  users = users.filter((user) => user.id !== id);
  if (users.length < originalLength) {
    saveUsers(users);
    log(`User with ID ${id} removed.`);
  } else {
    log(`User with ID ${id} not found.`);
  }
}

// List all users
function listUsers() {
  const users = loadUsers();
  log("Listing Users:");
  users.forEach((user) => {
    console.log(`🔹 ${user.id}: ${user.name} (${user.email})`);
  });
}

module.exports = {
  addUser,
  removeUser,
  listUsers,
};
```

#### ✅ 4. app.js — Main App

```js
const userService = require("./utils/userService");

// Simulate actions
userService.addUser("Salma", "salma@mail.com");
userService.addUser("Mohamed", "mohamed@mail.com");

userService.listUsers();

userService.removeUser(1);

userService.listUsers();
```

#### 🔁 5. How to Run It

```bash
node app.js
```

📘 **Tip**: Always handle errors and prefer async methods in production.
