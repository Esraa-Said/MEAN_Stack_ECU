# 🧬 What is Inheritance?

- **Inheritance** allows one class (called the **child** or **subclass**) to **reuse properties and methods** from another class (called the **parent** or **superclass**).

- It lets you **avoid repetition**, **organize shared logic**, and **extend functionality**.

### Example:

- Classes **share** some **properties** and **methods**.

```js
class User {
  constructor(userName, userId, userEmail) {
    this.userName = userName;
    this.userId = userId;
    this.userEmail = userEmail;
  }
  login(password) {}
  sendMessage(str) {}
}
```

```js
class Admin {
  constructor(userName, userId, userEmail, permissions) {
    this.userName = userName;
    this.userId = userId;
    this.userEmail = userEmail;
    this.permissions = permissions;
  }
  login(password) {}
  sendMessage(str) {}
  deleteUser(user) {}
}
```

- Instead of make two separate classes, make one inherit from another one.

### Example:

```js
class User {
  constructor(userName, userId, userEmail) {
    this.userName = userName;
    this.userId = userId;
    this.userEmail = userEmail;
  }
  login(password) {
    console.log(`Login with password ${password}`);
  }
  sendMessage(str) {
    console.log(str);
  }
}

class Admin extends User {
  constructor(userName, userId, userEmail, permissions) {
    super(userName, userId, userEmail);
    this.permissions = permissions;
  }

  deleteUser() {
    console.log("User is deleted");
  }
}

const admin_1 = new Admin("ahmed_ali", 1, "ahmed22@gmail.com", "Delete");
console.log(admin_1);
admin_1.login(12345);
admin_1.sendMessage("I can send a message");
admin_1.deleteUser();
```

---

### Example

```js
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  login() {
    console.log(`${this.name} logged in.`);
  }
}

class Doctor extends User {
  constructor(name, email, specialty) {
    super(name, email);
    this.specialty = specialty;
  }

  diagnose() {
    console.log(`${this.name} is diagnosing...`);
  }
}

class Admin extends User {
  deleteUser(userName) {
    console.log(`${this.name} deleted ${userName}`);
  }
}
```

### Example

```js
class MedicalStaff {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }

  clockIn() {
    console.log(`${this.name} (${this.role}) clocked in`);
  }
}

class Nurse extends MedicalStaff {
  assist() {
    console.log(`${this.name} is assisting the doctor`);
  }
}

class Surgeon extends MedicalStaff {
  operate() {
    console.log(`${this.name} is performing surgery`);
  }
}

const nurse = new Nurse("Noura", "Nurse");
nurse.clockIn(); // Inherited
nurse.assist(); // Specific

const surgeon = new Surgeon("Dr. Ali", "Surgeon");
surgeon.clockIn(); // Inherited
surgeon.operate(); // Specific
```
