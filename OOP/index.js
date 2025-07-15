// object
// oop
// constructor function
// class
// Inheritance
// polymorphism
// encapsulation getter setter
// abstraction

class User {
  #id;
  #email;

  constructor(name, id, email) {
    this.name = name;
    this.#id = id;
    this.email = email;
   
  }

  get email() {
    return this.#email;
  }

  set email(email) {
    if (email.includes("@")) {
      this.#email = email;
    } else {
      console.log("😡 Invalid Email");
    }
  }

  get id() {
    return this.#id;
  }
}

const user = new User("ahmed", 1, "ahmedgmail.com");
user.email = "esraa";
user.name = "kk";
