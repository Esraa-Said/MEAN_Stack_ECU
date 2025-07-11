**Definition:** Objects of different classes can respond to the same method name differently.
**Why?**

- To write flexible and extendable code

```js
class Animal {
  speak() {
    console.log("Generic animal sound");
  }
}

class Cat extends Animal {
  speak() {
    console.log("Meow");
  }
}

class Cow extends Animal {
  speak() {
    console.log("Moo");
  }
}

const animals = [new Animal(), new Cat(), new Cow()];
animals.forEach((a) => a.speak());
```

---

```js
class User {
  constructor(name) {
    this.name = name;
  }

  performAction() {
    console.log(`${this.name} is performing a general action.`);
  }
}

class Admin extends User {
  performAction() {
    console.log(`🛠️ Admin ${this.name} is managing users.`);
  }
}

class Doctor extends User {
  performAction() {
    console.log(`🩺 Doctor ${this.name} is diagnosing patients.`);
  }
}

class Patient extends User {
  performAction() {
    console.log(`📅 Patient ${this.name} is booking an appointment.`);
  }
}
const users = [new Admin("Mona"), new Doctor("Esraa"), new Patient("Ali")];

users.forEach((user) => {
  user.performAction();
});
```
