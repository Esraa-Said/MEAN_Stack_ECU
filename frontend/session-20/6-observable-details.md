# 🌟 How To Create an Observable in RxJS

In RxJS, an **Observable** represents a stream of data that can be observed over time. This is the backbone of reactive programming in Angular.

---

## 📌 Main Concepts

1. **Observable** – Emits data over time.
2. **Observer** – Consumes data emitted by the Observable.
3. **Subscription / Handler** – Defines what to do with emitted data.

---

## 🔄 Core Observable Methods

### `next()`
Emits the next value in the stream.

```ts
export class App {
  data: any[] = [];

  myObservable = new Observable((observer) => {
    observer.next(1);
    observer.next(2);
    observer.next(3);
  });

  getDate() {
    this.myObservable.subscribe((val: any) => {
      this.data.push(val);
    });
  }
}
```

📌 This example emits numbers from 1 to 3, which are pushed into the `data` array.

---

### `error()`
Handles errors in the observable stream and stops further emissions.

```ts
export class App {
  data: any[] = [];

  myObservable = new Observable((observer) => {
    observer.next(1);
    observer.error(new Error('Something went wrong!'));
    observer.next(2); // Will not be called
  });

  getDate() {
    this.myObservable.subscribe(
      (val) => this.data.push(val),
      (error) => alert(error.message)
    );
  }
}
```

📌 The stream stops after `error()` is called, and the error is alerted.

---

### `complete()`
Signals that no more values will be emitted.

```ts
export class App {
  data: any[] = [];

  myObservable = new Observable((observer) => {
    observer.next(1);
    observer.next(2);
    observer.complete();
    observer.next(3); // Ignored
  });

  getDate() {
    this.myObservable.subscribe(
      (val) => this.data.push(val),
      (error) => alert(error.message),
      () => alert('Stream complete!')
    );
  }
}
```

✅ Useful for final cleanup or notification when the stream ends.

---

### 🆕 New Subscription Syntax (Object Form)

```ts
this.myObservable.subscribe({
  next: (val: any) => this.data.push(val),
  error: (err) => alert(err.message),
  complete: () => alert('all data received'),
});
```

📌 Clearer structure, especially when handling all three callbacks.

---
# RxJS `of` vs `from` in Angular
In RxJS, both of and from are creation operators used to create Observables.

## 📦 `of` Operator

### ➕ Purpose:
Creates an observable that emits the **arguments you pass in** — exactly as they are.

### 🧠 Behavior:
- Emits each argument as a separate value.
- If you pass an array, it emits the **whole array as one item**.

### ✅ Example 1: Emitting multiple values
```ts
import { of } from 'rxjs';

const obs$ = of(1, 2, 3);
obs$.subscribe(val => console.log(val));
```

**Output:**
```
1
2
3
```

---

### ✅ Example 2: Emitting a single array
```ts
const obs$ = of([1, 2, 3]);
obs$.subscribe(val => console.log(val));
```

**Output:**
```
[1, 2, 3]
```

📌 The entire array is emitted **as a single value**.


---

## 📦 `from` Operator

### ➕ Purpose:
Creates an observable from an **iterable** (like an array, string, or promise), and emits **each item individually**.

### ✅ Example 1: From an array
```ts
import { from } from 'rxjs';

const obs$ = from([1, 2, 3]);
obs$.subscribe(val => console.log(val));
```

**Output:**
```
1
2
3
```

📌 Each item is emitted **one by one**.

---

### ✅ Example 2: From a Promise
```ts
const promise = Promise.resolve('hello');
const obs$ = from(promise);
obs$.subscribe(val => console.log(val));
```

**Output:**
```
hello
```


---

## 🆚 `of` vs `from` – Summary

| Feature         | `of()`                            | `from()`                             |
|------------------|------------------------------------|---------------------------------------|
| Emits             | Arguments as-is                  | Items from iterable or promise |
| Array Behavior | Emits whole array once      | Emits each array item             |
| Promise Support | Emits the whole promise object | Emits resolved value                |
| Use Case        | Simple mock values, configs | Working with iterables, async data |

---

## 📌 Real Use in Angular

### Using `of()` to return mock data in a service:
```ts
getMockDepartments(): Observable<string[]> {
  return of(['Cardiology', 'Neurology']);
}
```

### Using `from()` to wrap a promise:
```ts
getData(): Observable<any> {
  const promise = fetch('https://api.example.com/data');
  return from(promise);
}
```

---

## ✅ Tip:
Use the `$` at the end of variable names to indicate they are **Observables**:

```ts
users$: Observable<User[]> = this.userService.getUsers();
```

---



# RxJS Operators in Angular: `pipe`, `map`, and `filter`

## 📌 Introduction

RxJS (Reactive Extensions for JavaScript) is a powerful library used in Angular to handle asynchronous and event-based programs using Observables. The `pipe` method and its operators like `map` and `filter` are essential tools for transforming and managing observable streams.

---

## ✅ 1. `pipe()`

### What it does:
The `pipe` function is used to combine multiple RxJS operators. It's a method available on Observables that allows you to chain multiple operations.

### Example:
```ts
import { of } from 'rxjs';
import { pipe, map } from 'rxjs/operators';

of(1, 2, 3)
  .pipe(map(x => x * 2))
  .subscribe(console.log); // Output: 2, 4, 6
```

---

## ✅ 2. `map()`

### What it does:
`map` transforms each emitted value from the source observable using a projection function.

### Easy Example:
```ts
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

of(5, 10, 15)
  .pipe(map(x => x + 1))
  .subscribe(console.log); // Output: 6, 11, 16
```

### Real-world Example:
Mapping data from an API to a model.
```ts
this.http.get<User[]>('/api/users')
  .pipe(
    map(users => users.map(user => ({
      ...user,
      fullName: user.firstName + ' ' + user.lastName
    })))
  )
  .subscribe(users => console.log(users));
```

---

## ✅ 3. `filter()`

### What it does:
`filter` emits only those items from the source Observable that pass a condition.

### Easy Example:
```ts
import { of } from 'rxjs';
import { filter } from 'rxjs/operators';

of(1, 2, 3, 4, 5)
  .pipe(filter(x => x % 2 === 0))
  .subscribe(console.log); // Output: 2, 4
```

### Real-world Example:
Filtering active users from API results.
```ts
this.http.get<User[]>('/api/users')
  .pipe(
    map(users => users.filter(user => user.isActive))
  )
  .subscribe(activeUsers => console.log(activeUsers));
```

---

## 🔄 Combining `map` and `filter` with `pipe`

```ts
this.http.get<User[]>('/api/users')
  .pipe(
    map(users => users.filter(user => user.isActive)),
    map(activeUsers => activeUsers.map(u => ({ ...u, nameUpper: u.name.toUpperCase() })))
  )
  .subscribe(console.log);
```

---

## 💡 Summary

| Operator | Purpose                         | Example Use Case |
|----------|----------------------------------|------------------|
| `pipe()` | Chains multiple operators       | Data transformations |
| `map()`  | Transforms emitted values       | Add new field to response |
| `filter()`| Filters emitted values          | Show only active records |

These operators help you write clean, readable, and reactive code in Angular.

---
