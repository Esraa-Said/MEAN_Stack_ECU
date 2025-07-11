# 🔧 Constructor Functions

A **constructor function** is a regular function, but when used with the `new` keyword, it acts as a **blueprint** for creating new objects.

---

### ✅ With Constructor Function

```js
function Car(make, year) {
  this.make = make;
  this.year = year;
  this.drive = function () {
    console.log("Vroom!");
  };
}

// Create 3 objects
const car1 = new Car("Toyota", 2020);
const car2 = new Car("Toyota", 2020);
const car3 = new Car("Toyota", 2020);
```

---

### 📊 Comparison

| Feature            | Manual Object | Constructor Function |
| ------------------ | ------------- | -------------------- |
| Repetition         | ❌ Yes        | ✅ No                |
| Easy to update all | ❌ No         | ✅ Yes               |
| Scalability        | ❌ Poor       | ✅ Excellent         |

#### 🙋 Example: Constructor for Users

```js
function User(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.fullName = function () {
    console.log(`My Name is ${this.firstName} ${this.lastName}`);
  };
}
const user_1 = new User("Esraa", "Said");
const user_2 = new User("Ahmed", "Ali");
user_1.firstName = "Sara";
user_1.fullName();
```
