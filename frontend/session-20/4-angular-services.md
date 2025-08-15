# **Angular Services**

## 📘 What is a Service in Angular?
A **Service** is a plain TypeScript class that contains reusable logic and/or shared data.  
In Angular, components should focus on the **UI**, while services handle **business logic** and **data management**.

> Instead of repeating the same logic in multiple components, write it once in a service and reuse it everywhere.

---

## 💡 Why Services?
- **Share logic** between components.
- **Separation of Concerns**: Components for UI, Services for logic.
- **Reusability**: One service can be used throughout the app.
- **Easier testing** and maintainability.

---

## ❌ Problem 1 — Without a Service
Imagine a landing page with **three login buttons**: in the header, left sidebar, and right sidebar.  
Each button has the **same login logic**, but it’s written in three separate components.  
If logic changes, you must update it in all places.  
![alt text](problem_1.png)

---

## ❌ Problem 2 — Without a Service
Example: fetching the same user data in multiple components.

```ts
// Component 1
export class ComponentOne {
  users = [
    { id: 1, name: 'Ahmed' },
    { id: 2, name: 'Sara' },
  ];
}

// Component 2
export class ComponentTwo {
  users = [
    { id: 1, name: 'Ahmed' },
    { id: 2, name: 'Sara' },
  ];
}
```
**Problems:**
- Code duplication.
- Hard to update later.
- Violates the DRY principle.

---

## ✅ Solution — Use a Service
```ts
// user.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  getUsers() {
    return [
      { id: 1, name: 'Ahmed' },
      { id: 2, name: 'Sara' },
    ];
  }
}
```

### Using the Service in a Component
```ts
import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-one',
  template: `<ul><li *ngFor="let user of users">{{ user.name }}</li></ul>`
})
export class ComponentOne {
  users = this.userService.getUsers();
  constructor(private userService: UserService) {} // injected via constructor
}
```

---

## 🛠️ Creating a Service
Using Angular CLI:
```bash
ng generate service services/task
```
This generates:
- `task.service.ts`
- `task.service.spec.ts`

---

## 🧩 Using @Injectable()
```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor() {}
}
```
- `@Injectable()` tells Angular that this class can be injected.
- `providedIn: 'root'` makes it **singleton app-wide**.

---

## 🔍 What is a Provider?
A **provider** tells Angular **how** to create and deliver a service.

> "If I request `TaskService`, how should Angular get it?"

---

### 🔸 Types of Providers

#### 1. **Root Provider** (Singleton)
Defined like:
```ts
@Injectable({ providedIn: 'root' })
export class LoggingService {
  log(msg: string) {
    console.log('Log:', msg);
  }
}
```
Every component gets the **same instance**.

---

#### 2. **Component-level Provider** (New instance per component)
```ts
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  providers: [ProductService]
})
export class ProductComponent {}
```
Every component instance gets its **own service instance**.

**Use case:** Each component needs separate state (e.g., wizards, forms).

---

## 🔁 Provider Scope Visualization
```
AppModule (root)
│
├── HomeComponent (uses LoggingService from root)
│
├── AdminModule (has AdminService for all its components)
│
└── ProductComponent (has its own ProductService instance)
```

---

## 🧪 Provider Scope Example

**Root Provider (shared):**
```ts
@Injectable({ providedIn: 'root' })
export class CounterService {
  counter = 0;
  increment() { this.counter++; }
  get() { return this.counter; }
}
```

**Component Provider (unique):**
```ts
@Component({
  selector: 'app-counter',
  providers: [CounterService],
  template: `<button (click)="inc()">Increment</button> {{ count }}`
})
export class CounterComponent {
  constructor(public counterService: CounterService) {}
  count = 0;
  inc() {
    this.counterService.increment();
    this.count = this.counterService.get();
  }
}
```
Every `<app-counter>` has its own counter.

---

## 🆚 Constructor Injection vs `inject()` Function

### 1. **Constructor Injection** (Traditional)
```ts
@Component({...})
export class HomeComponent {
  constructor(private logger: LoggingService) {}

  logMessage() {
    this.logger.log('Hello from constructor injection');
  }
}
```
✅ Easy and familiar.  
❌ Must be inside a class constructor.

---

### 2. **`inject()` Function** (Angular 14+)
```ts
import { inject } from '@angular/core';

@Component({...})
export class DashboardComponent {
  private logger = inject(LoggingService);

  logMessage() {
    this.logger.log('Hello from inject()');
  }
}
```
✅ Can be used in:
- Class fields
- Standalone functions
- Without touching constructor

❌ Works only inside Angular DI context.

---

### 📌 When to Use Which?
| Constructor Injection | `inject()` |
|-----------------------|------------|
| Common in most codebases. | Great for standalone components/functions. |
| Clear dependency list in constructor. | Cleaner when many services are needed. |
| Works with all Angular versions. | Angular 14+ only. |

---

## 📚 Summary
- Use **services** to share logic and avoid duplication.
- Use **providers** to control service scope (root-level or component-level).
- Use **constructor injection** for most cases.
- Use **`inject()`** for more flexible or functional-style code.
