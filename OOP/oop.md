# Object Oriented Programming OOP

- **OOP** (Object-Oriented Programming) is a programming paradigm based on the concept of **objects**, which are instances of **classes**.

## ✅ Benefits of OOP:

- 🧩 Better code organization
- 🛠 Easier to maintain and extend
- 🔁 Promotes reusability
- 🌍 Helps model real-world entities

### ❌ Without OOP

```js
const car1 = {
  make: "Toyota_0",
  year: 2020,
  drive: function () {
    console.log("Driving...");
  },
};

const car2 = {
  make: "Toyota_1",
  year: 2025,
  drive: function () {
    console.log("Driving...");
  },
};

const car3 = {
  make: "Toyota",
  year: 2020,
  drive: function () {
    console.log("Driving...");
  },
};
```

#### 👎 Problem

If you want to change a property or method (e.g., update `year` or change the `drive()` method), you must manually update every object — this is **not scalable**.

## Classical OOP: Classes

- **Classes** ------> **Instance**
- **Objects(instances)** are **instantiated** from a **class**.
- **class**: blueprint.

## OOP in JS [ProtoTypes]

- Objects are **linked** to a prototype object.
- **Prototypal Inheritance:** The prototype contains methods that are accessible to all objects linked to that prototype.
