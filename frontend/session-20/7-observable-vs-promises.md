# 📊 Promise vs Observable in JavaScript & Angular

When working with asynchronous operations in JavaScript and Angular, you'll often deal with **Promises** and **Observables**. While they may seem similar, they serve different use cases and offer different capabilities.

---

## 🔁 Comparison Table

| Feature | Promise | Observable |
|--------|---------|------------|
| **Native Support** | ✅ Native to JavaScript | ❌ Not native, provided by RxJS |
| **Execution** | Eager: executes immediately | Lazy: executes only when subscribed |
| **Values Emitted** | Only a single value | Can emit multiple values over time |
| **Methods Available** | `.then()`, `.catch()` for success & error | `.subscribe()` for success, error, and completion |
| **Sync/Async** | Always asynchronous | Can be synchronous or asynchronous |

---

## ✅ When to Use What?

| Use Case | Recommended |
|----------|-------------|
| Single HTTP request | ✅ Promise or Observable |
| Multiple values/events over time (e.g., user input, clicks) | ✅ Observable |
| Need to cancel or retry the request | ✅ Observable |
| Want simple syntax for one-time result | ✅ Promise (with async/await) |

---

## 🔍 Example

### Promise Example:
```ts
function getData(): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => resolve('Data received'), 1000);
  });
}

getData().then(console.log);
```

### Observable Example:
```ts
import { Observable } from 'rxjs';

const data$ = new Observable(observer => {
  observer.next('First');
  setTimeout(() => observer.next('Second'), 1000);
  setTimeout(() => observer.complete(), 2000);
});

data$.subscribe({
  next: val => console.log(val),
  complete: () => console.log('Done')
});
```

---

## 📦 Summary

- Use **Promise** for simple, one-time asynchronous actions.
- Use **Observable** when working with streams, multiple values, cancelable operations, or more advanced reactive features.

---

