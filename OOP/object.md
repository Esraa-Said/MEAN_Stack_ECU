# Object

- Object is a **Data structure** that allows you to store collections of key-value pairs. These key-value pairs are called properties,
- An object is a container that stores related data (properties) and functions (methods) that act on that data.
- It represents a real-world entity like a car, user, product, etc.

## How To Create an Object

####

```js
const person = {
  // Properties
  name: "Ali",
  age: 30,
  isStudent: false,
  // Methods
  greet: function () {
    console.log(`Hello!`);
  },
};
// Accessing properties
console.log(person.name);

// Calling a method
person.greet();
```

#### Using _new_ Keyword

```js
let person = new Object({
  // Properties
  name: "Ali",
  age: 30,
  isStudent: false,
  // Methods
  greet: function () {
    console.log(`Hello!`);
  },
});
// Accessing properties
console.log(person.name);

// Calling a method
person.greet();
```

---

## How To Access Properties

#### 1- Dot Notation

```js
console.log(person.name);
console.log(person.age);
console.log(person.isStudent);
```

#### 2- Bracket Notation

```js
console.log(person["name"]);
console.log(person["age"]);
```

- support Dynamic Property name

```js
let x = "country";
let user = {
  username: "Ali",
  country: "Egypt",
};
console.log(user.x); // undefined
console.log(user[x]); // Egypt
```

## How To Add & Update Property

```js
let user = {
  username: "Ali",
  country: "Egypt",
};
// Update Property
user.username = "Mohamed";
console.log(user.username);
// Add New Property
user.age = 40;
console.log(user.age);
```

## How To Add & Update Method

```js
let user = {
  username: "Ali",
  country: "Egypt",
  sayHi: function () {
    console.log("Hi😁");
  },
};
// Update Method
user.sayHi = function () {
  console.log("Hi from updated method 😊");
};
user.sayHi();
// Add New Method
user.sayBye = function () {
  console.log("Bye from new added method 😊");
};
user.sayBye();
```

## Nested Objects

```js
const student = {
  name: "Sara",
  age: 21,
  contact: {
    email: "sara@example.com",
    phone: {
      mobile: "01000000000",
      home: "023456789",
    },
  },
  grades: {
    math: 90,
    science: 85,
  },
};
console.log(student.name);
console.log(student.contact.email);
console.log(student.contact.phone.home);
console.log(student.grades.math);
```

## Understanding this in JavaScript Objects

### What is this?

In JavaScript, this refers to the object that is currently executing the method.
It gives you access to the properties and other methods within the same object.

```js
const car = {
  brand: "Toyota",
  model: "Corolla",
  start: function () {
    console.log(`${this.brand} ${this.model} is starting...`);
  },
};

car.start();
```

### ⚠️ Be Careful with Arrow Functions

```js
const animal = {
  type: "Cat",
  speak: () => {
    console.log(`${this.type} is meowing`);
  },
};

animal.speak(); // undefined is meowing ❌
```

#### Solution: Regular Functions

```js
const animal = {
  type: "Cat",
  speak: function () {
    console.log(`${this.type} is meowing`);
  },
};

animal.speak(); // Cat is meowing ✅
```

---

```js
const product = {
  name: "Headphones",
  price: 100,
  taxRate: 0.15,
  getTotalPrice: function () {
    return this.price + this.price * this.taxRate;
  },
};

console.log(product.getTotalPrice());
```
