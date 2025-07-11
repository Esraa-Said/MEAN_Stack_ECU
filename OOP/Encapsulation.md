**Definition:** Bundling data and methods into one unit and protecting internal state.
**Why?**

- To prevent direct access to sensitive data
- To reduce complexity

```js
class Account {
  #balance = 0;

  deposit(amount) {
    if (amount > 0) this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const acc = new Account();
acc.deposit(1000);
acc.#balance = -999999; // ❌ Error: Private field
```
