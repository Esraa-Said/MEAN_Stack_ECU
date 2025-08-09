# Angular Component 

## 📌 What is a Component in Angular?

A **component** in Angular is a foundational unit of the framework used to define a **portion of the user interface (UI)**. Each component in Angular controls a piece of the UI and is composed of the following:

1. **HTML Template** – Defines the UI layout.
2. **TypeScript Class** – Contains the logic and data.
3. **CSS/SCSS Styles** – Defines how the UI looks.

These parts work together to create a fully functional and encapsulated UI block.

---


## 🚀 How to Create a Component

Using Angular CLI:

```bash
ng generate component my-component
```

Or shorthand:

```bash
ng g c my-component
```

---
## 🔧 Structure of a Component

When you generate a component using the Angular CLI, it creates these files:


```
my-component/
├── my-component.ts      // TypeScript logic
├── my-component.html    // HTML template
├── my-component.css     // Styling 
├── my-component.spec.ts // (Optional) Unit testing file
```

---

## 📂 Component File Breakdown

### 1. **TypeScript File (`.ts`)**

Contains the component logic and metadata.

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-component',             
  templateUrl: './my-component.html',
  styleUrls: ['./my-component.css']
})
export class MyComponent {
  title: string = 'Hello Angular!';
}
```

### 2. **HTML Template (`.html`)**

Defines the view (UI) that the user sees.

```html
<h1>{{ title }}</h1>
<p>This is my first Angular component!</p>
```

### 3. **CSS File (`.css`)**

Used to style the component template.

```css
h1 {
  color: #1976d2;
}
```

---

## 🧩 Selector

The `selector` is a **custom HTML tag** you can use to embed the component in another template.

```html
<app-my-component></app-my-component>
```

