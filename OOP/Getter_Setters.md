# 🧠 What Are `getters` and `setters` in JavaScript?

They are **special methods** used to: \* `get` a property’s value

- `set` (assign) a property’s value
  They allow us to **add logic** (like validation, formatting, or transformations) when accessing or updating a property — instead of doing it directly.

# 🎯 Why Use `getters` and `setters` Instead of Direct Access?

Because **direct access is risky** — anyone can assign anything to your object, even wrong or invalid data.

## 🔴 Without setter (no validation):

```js
class User {
  constructor(name) {
    this.name = name;
  }
}

const user = new User("Esraa");
user.name = ""; // ❌ No check, empty name allowed!
console.log(user.name); // Output: ""
```



## 🧮 Example: Use getter to calculate a value

```js
class Person {
  constructor(birthYear) {
    this.birthYear = birthYear;
  }

  get age() {
    const currentYear = new Date().getFullYear();
    return currentYear - this.birthYear;
  }
}

const p = new Person(2000);
console.log(p.age);
```

## Encapsulation + Getter/Setter

```js
class BankAccount {
  #balance = 0; // 🔐 Private property

  constructor(owner) {
    this.owner = owner;
  }

  get balance() {
    return this.#balance;
  }

  set balance(amount) {
    if (typeof amount !== "number" || amount < 0) {
      console.log("❌ Invalid balance. Must be a non-negative number.");
    } else {
      this.#balance = amount;
    }
  }

  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      console.log(`Deposited: ${amount}`);
    }
  }

  withdraw(amount) {
    if (amount > 0 && amount <= this.#balance) {
      this.#balance -= amount;
      console.log(`Withdrew: ${amount}`);
    } else {
      console.log(
        "❌ Withdrawal failed. Not enough balance or invalid amount."
      );
    }
  }
}

const account = new BankAccount("Esraa");

account.deposit(500);
console.log(account.balance);

account.balance = 2000;
console.log(account.balance);

account.balance = -100;
```
