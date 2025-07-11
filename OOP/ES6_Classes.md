# ES6 Classes

### 💡 What is a Class?

In JavaScript, a `class` is a modern way (introduced in ES6) to create **blueprints** for objects. It simplifies the older `constructor function + prototype` pattern.

Think of a class as a template: _ It defines **what data (properties)** each object should hold _ And **what actions (methods)** it can perform

```js
class Person {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  calcAge() {
    console.log(2025 - this.birthYear);
  }
}

const person_1 = new Person("Ahmed", 1950);
console.log(person_1.firstName);
```

---
