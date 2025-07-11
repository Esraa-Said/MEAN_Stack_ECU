### 📦 Static Properties and Methods in JavaScript Classes

**Static methods** and **static properties** are used when a behavior or value belongs to the **class itself**, not to the objects created from it.

#### 🧠 What does "static" mean?

- **Instance method** → belongs to an object created from the class.
- **Static method** → belongs to the class, not the object.

### 📊 Comparison Table

| Feature           | Instance Method                              | Static Method            |
| ----------------- | -------------------------------------------- | ------------------------ |
| Belongs to        | Object instance                              | Class itself             |
| Accessed via      | `object.method()`                            | `ClassName.method()`     |
| Can access `this` | Refers to the object                         | Refers to the class only |
| Use case          | Behavior of one object                       | Utility/helper logic     |
| Memory Usage      | Per instance (if defined inside constructor) | Shared across class      |

### 📌 Example:

```js
class Car {
  static count = 0;

  constructor(brand) {
    this.brand = brand;
    Car.count++; // Increments every time a car is created
  }

  static showCount() {
    console.log(`Total cars created: ${Car.count}`);
  }
}

const car1 = new Car("Audi");
const car2 = new Car("Mercedes");
const car3 = new Car("Ford");

Car.showCount(); // Output: Total cars created: 3
```
