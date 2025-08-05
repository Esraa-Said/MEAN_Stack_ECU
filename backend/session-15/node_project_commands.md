# Node.js Project Setup

This guide provides the essential steps to set up a secure Node.js backend using:

- Express
- Mongoose
- bcryptjs (for password hashing)
- jsonwebtoken (for token generation)
- nodemon (optional for development)

---

## 1. Initialize Node.js Project

```bash
npm init -y
```

---

## 2. Install Required Packages

```bash
npm install express mongoose bcryptjs jsonwebtoken
npm install --save-dev nodemon
```

---


## 3. Generate a Strong JWT Secret Key


```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the result and use it as your JWT secret key.

---

## 🔍 Explanation: Nodemon

Nodemon automatically restarts the server when files are changed — ideal for development.

**Install Nodemon**:

```bash
npm install --save-dev nodemon
```

**Add Start Script in `package.json`:**

```json
"scripts": {
  "start": "nodemon server.js"
}
```

Now, you can run the server with:

```bash
npm start
```

---

## 4. Setup Express Server

**File: `server.js`**

```js
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());


mongoose.connect('your_mongodb_connection_string_here')
  .then(() => console.log('DB connected'))
  .catch(err => console.log(err));

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
```

---

## 5. Create User Schema with Mongoose

```js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
```

---

## 6. Generate JWT Token

```js
const jwt = require('jsonwebtoken');

function createToken(userId) {
  return jwt.sign({ id: userId }, 'your_jwt_secret_key', {
    expiresIn: '1d'
  });
}
```

---

## 7. Protect Routes Middleware

```js
const jwt = require('jsonwebtoken');

const protectRoutes = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token && token.startsWith('Bearer')) {
      token = token.split(' ')[1];
      const decoded = jwt.verify(token, 'your_jwt_secret_key');
      req.userId = decoded.id;
      next();
    } else {
      res.status(401).json({ message: 'Not authorized' });
    }
  } catch (err) {
    res.status(401).json({ message: 'Token failed' });
  }
};

module.exports = protectRoutes;
```

