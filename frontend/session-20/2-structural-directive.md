# Angular Structural Directives Deep Dive

This document provides a comprehensive explanation and usage guide for Angular Structural Directives such as `*ngIf`, `*ngFor`, `*ngSwitch`, `<ng-template>`, `<ng-container>`, as well as Angular 17's new control flow syntax: `@if`, `@for`, and `@switch`. It also covers performance optimization using `trackBy` and explains how to handle conflicts when using multiple structural directives.

---

## 🔧 Structural Directives Overview

Structural directives change the DOM layout by adding or removing elements dynamically.

- `*ngIf`: Conditionally includes an element.
- `*ngFor`: Iterates over a collection.
- `*ngSwitch`: Shows one view from multiple possible options.
- `<ng-template>`: Defines template blocks.
- `<ng-container>`: Logical grouping without adding DOM nodes.
- `@if`, `@for`, `@switch`: Angular 17’s control flow syntax.
- `trackBy`: Optimizes `*ngFor` and `@for` by uniquely identifying items.

---

## ✅ 1. *ngIf — Conditional Rendering

### Examples:

```html
<p *ngIf="isLoggedIn">Welcome, user!</p>
```

```html
<div *ngIf="hasData; else noData">Data loaded!</div>
<ng-template #noData>No data available.</ng-template>
```

```html
<p *ngIf="user && user.name">{{ user.name }}</p>
```

```html
<ul *ngIf="items.length > 0"><li *ngFor="let item of items">{{ item }}</li></ul>
```

```html
<button (click)="show = !show">Toggle</button>
<div *ngIf="show">This is toggled content</div>
```

---
## ✅ 2. *ngFor — Looping Over Collections

### Examples:

```html
<ul>
  <li *ngFor="let fruit of fruits">{{ fruit }}</li>
</ul>
```
```ts
fruits = ['Apple', 'Banana', 'Mango'];
```
---

```html
<ul>
  <li *ngFor="let fruit of fruits; let i = index">{{ i + 1 }} - {{ fruit }}</li>
</ul>
```
```ts
fruits = ['Apple', 'Banana', 'Mango'];
```
---

```html
<div *ngFor="let user of users; trackBy: trackByUserId">{{ user.name }}</div>
```
```ts
users = [{ id: 1, name: 'Ali' }, { id: 2, name: 'Sara' }];
trackByUserId(index: number, user: any) {
  return user.id;
}
```
---

```html
<div *ngFor="let group of groups">
  <h3>{{ group.name }}</h3>
  <ul><li *ngFor="let item of group.items">{{ item }}</li></ul>
</div>
```

```html
<div *ngFor="let product of products">
  <p *ngIf="product.inStock">{{ product.name }} - Available</p>
</div>
```

---


## ✅ 3. *ngSwitch — Multi-case Conditional Rendering

### Examples:
```html
<div [ngSwitch]="value">
  <p *ngSwitchCase="'case1'">Case 1</p>
  <p *ngSwitchCase="'case2'">Case 2</p>
  <p *ngSwitchDefault>Default Case</p>
</div>
```


---

## ✅ 4. `<ng-template>` 
Hidden by default; used with structural directives.
Ideal for else blocks and dynamic template rendering.
Used in cases like `*ngIf else`, dynamic content, reusable templates, component placeholders, and default views in `*ngSwitch`.

```html
<div *ngIf="loggedIn; else guest">
  Welcome back!
</div>
<ng-template #guest>
  Please log in.
</ng-template>
```
---
```html
<ng-template #loadingTemplate>
  <p>Loading data...</p>
</ng-template>

```
--- 
```html
<div [ngSwitch]="value">
  <p *ngSwitchCase="'yes'">Yes</p>
  <p *ngSwitchCase="'no'">No</p>
  <ng-template ngSwitchDefault><p>Unknown</p></ng-template>
</div>
```

## ✅ 5. `<ng-container>` — Logical Grouping

### Structural Directive Conflict

Angular **does not allow more than one structural directive on the same element**.

### ❌ Incorrect:
```html
<div *ngIf="show" *ngFor="let item of items"></div>
```

### ✅ Solutions:

1. Use `<ng-container>`: Used to group elements or combine multiple structural directives without adding extra DOM nodes.


```html
<ng-container *ngIf="show">
  <div *ngFor="let item of items">{{ item }}</div>
</ng-container>
```

---

## ✅ 6. Angular 17 Control Flow

### @if

```html
@if(user){ <p>{{ user.name }}</p> } @else { <p>No user</p> }
```
--- 
```html
@if(value === 1){
  <p>One</p>
} @else if(value === 2){
  <p>Two</p>
} @else {
  <p>Other</p>
}
```
---
```html
@if(user){
  @if(user.isVerified){
    <p>Verified User</p>
  }
}
```

### @for

```html
@for (let item of items; track item.id) {
  <div>{{ item.name }}</div>
}
```
---
```html
@for (let item of cart; track $index){
  <div>{{ $index + 1 }}. {{ item }}</div>
}
```
---

```html
@for (let group of groups){
  <h3>{{ group.name }}</h3>
  @for (let member of group.members){
    <p>{{ member }}</p>
  }
}
```
--- 
```html
@if(products.length){
  @for (let product of products){
    <p>{{ product.name }}</p>
  }
}
```


## ✅ 7. @switch — Angular 17

Syntax:
```html
@switch(expression) {
  @case('A') { <div>A</div> }
  @case('B') { <div>B</div> }
  @default { <div>Default</div> }
}
```

### Benefits:
- Cleaner syntax than `*ngSwitch`.
- Type-safe and modern.

---

## ✅ 8. trackBy in @for

### Purpose:
- Prevents unnecessary re-rendering.
- Angular identifies changed elements using a unique identifier.

### @for with trackBy:
```html
@for (let item of items; track item.id) {
  <div>{{ item.name }}</div>
}
```

