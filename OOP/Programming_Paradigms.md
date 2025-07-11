# Programming Paradigms

- Programming Paradigms ara different ways of style to write code or to organize the code.

## 1- Imperative Programming

- Tell the computer how to do something step by step.

```js
const numbers = [1, 2, 3];
const doubled = [];
for (let i = 0; i < numbers.length; i++) {
  doubled.push(numbers[i] * 2);
}
console.log(doubled);
```

## 2- Declarative Programming

- Tell the computer what to do, not how.

```js
const numbers = [1, 2, 3];
const doubled = numbers.map((num) => num * 2);
console.log(doubled);
```

## 3- Functional Programming

- Use functions to build your app.

```js
const greet = (name) => {
  return `Hello, ${name}`;
};
console.log(greet("Sara"));
```

## 4- Object-Oriented Programming (OOP)

- Object-Oriented Programming (OOP) is a programming paradigm based on the idea of **objects** that have:
  Properties and Methods.

```js
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

const dog = new Animal("Rex");
dog.speak();
```

## 5- Event-Driven Programming

- Run specific code when certain events happen.

```js
document.getElementById("btn").addEventListener("click", () => {
  alert("Button was clicked!");
});
```

## 6- Asynchronous Programming

- Allow tasks to run in background without blocking other operations.

#### Callback

```js
setTimeout(() => {
  console.log("Done after 2 seconds");
}, 2000);
```

#### Promise + async/await

```js
async function fetchUser() {
  const response = await fetch("https://api.example.com/user");
  const data = await response.json();
  console.log(data);
}
```
