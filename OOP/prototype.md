# 🧬 JavaScript Prototype

## 📌 What is `prototype`?

In JavaScript, every function has a built-in property called `prototype`. When you use that function as a constructor (with `new`), the objects it creates inherit properties and methods from that prototype.

> Think of `prototype` as a shared toolbox — all objects created from the constructor can use the same tools (methods) without copying them.

---

## 🧠 Why Use `prototype`?

To save memory and avoid duplicating functions across all objects.

### ❌ Without `prototype`:

```js
function Car(brand) {
  this.brand = brand;
  this.drive = function () {
    console.log(`${this.brand} is driving`);
  };
}

const car1 = new Car("Toyota");
const car2 = new Car("BMW");

console.log(car1.drive === car2.drive); // false ❌ each has a separate function
```

### ✅ With `prototype`:

```js
function Car(brand) {
  this.brand = brand;
}

Car.prototype.drive = function () {
  console.log(`${this.brand} is driving`);
};

const car1 = new Car("Toyota");
const car2 = new Car("BMW");

console.log(car1.drive === car2.drive); // true ✅ shared function
```

---

## 🔍 How the Prototype Chain Works

If JavaScript doesn't find a method or property on the object, it searches its prototype:

```js
car1.hasOwnProperty("brand"); // true
car1.hasOwnProperty("drive"); // false (it's on prototype)
car1.__proto__.hasOwnProperty("drive"); // true
```

### Chain:

```
car1 → Car.prototype → Object.prototype → null
```

---

## 🧪 Real Example: Users

```js
function User(name) {
  this.name = name;
}

User.prototype.login = function () {
  console.log(`${this.name} logged in`);
};

const u1 = new User("Esraa");
const u2 = new User("Ahmed");

u1.login(); // Esraa logged in
u2.login(); // Ahmed logged in
```

✅ Only one copy of `login()` exists — shared by all User instances.

---

## 🧠 `prototype` vs `__proto__`

| Concept     | Description                                              |
| ----------- | -------------------------------------------------------- |
| `prototype` | A property of **functions** (used when creating objects) |
| `__proto__` | A property of **objects** (points to their prototype)    |

```js
function Animal() {}
const cat = new Animal();

console.log(Animal.prototype); // Function prototype
console.log(cat.__proto__); // Points to Animal.prototype
```

---

## 📌 With Classes (ES6)

Modern syntax still uses prototype behind the scenes:

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Hello, ${this.name}`);
  }
}

const p1 = new Person("Sara");
const p2 = new Person("Ali");

console.log(p1.greet === p2.greet); // ✅ true — shared on prototype
```

---

## 🎓 Summary

- `prototype` holds methods shared across all instances of a constructor.
- Great for memory efficiency and reusable code.
- All JavaScript objects follow a prototype chain.
- `prototype` is the backbone of inheritance in JS.

Use `prototype` to build smarter, scalable JavaScript apps 🚀
