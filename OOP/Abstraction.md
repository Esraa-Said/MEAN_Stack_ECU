# Abstraction

**Definition:** Hiding internal logic and exposing only essential parts.

**Why?**

- To provide a clean interface
- To reduce the surface area for bugs

🎭 Example:

```js
class EmailService {
  send(email, message) {
    this.#connectSMTP();
    console.log(`Sending "${message}" to ${email}`);
  }

  #connectSMTP() {
    console.log("Connected to SMTP server");
  }
}

const emailer = new EmailService();
emailer.send("esraa@mail.com", "Welcome!");
```

---

🎭 Example:

```js
class OrderSystem {
  placeOrder(productName, quantity) {
    this.#checkInventory(productName, quantity);
    this.#processPayment();
    this.#sendConfirmationEmail();
    console.log(`Order placed for ${quantity} x ${productName}`);
  }

  #checkInventory(productName, quantity) {
    console.log(`Checking stock for ${quantity} of ${productName}...`);
  }

  #processPayment() {
    console.log("Processing payment securely...");
  }

  #sendConfirmationEmail() {
    console.log("Sending confirmation email to the user...");
  }
}

const order = new OrderSystem();
order.placeOrder("Laptop", 2);
```
