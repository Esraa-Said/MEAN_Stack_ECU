# Introduction to Template-Driven Forms

Template-Driven Forms in Angular allow you to manage form inputs, validation, and data binding directly in your HTML template while Angular automatically handles tracking and updating the data model.

---

## Advantages

1. **Simplicity** – Easy to implement for small forms.
2. **Less Code** – Most logic is in the HTML template.
3. **Automatic Tracking** – State changes tracked by Angular.
4. **Two-Way Binding** – Keeps data in sync with the UI.
5. **Fast Setup** – Great for small apps or prototypes.

---

## Disadvantages

1. **Not for Complex Forms** – Hard to scale for large/dynamic forms.
2. **Difficult Testing** – Logic tied to templates is harder to test.
3. **Less Control** – Reactive Forms offer more programmatic flexibility.
4. **Performance Issues** – Can be slower for large forms due to continuous checks.

---

## Steps to Create a Template-Driven Form

### 1. Import `FormsModule`

Add it to the `imports` array in your standalone component.

```ts
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-user-form",
  standalone: true,
  imports: [FormsModule], //// FormsModule
  templateUrl: "./user-form.component.html",
})
export class UserFormComponent {}
```

### 2. Create Template with `ngForm`

-  Remove Default Behavior `action` `method`.
- `button`/`input` with type `submit` emit `ngSubmit` event every time submitting.
- `template reference` is set to `ngForm` to make the form `Template Driven From` not normal `html form element`.

```html
<form #userForm="ngForm" (ngSubmit)="onSubmit()">
  <button type="submit">Submit</button>
</form>
```

### 3. Link the form with `component .ts` file
* Use `@ViewChild('templateRefName')` to access the `NgForm` instance from the template. 
* The `onSubmit()` method is triggered by `(ngSubmit)` when the form is submitted.
```ts
import { Component, ViewChild } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";

@Component({
  selector: "app-user-form",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./user-form.component.html",
})
export class UserFormComponent {
  @ViewChild("userForm") userForm!: NgForm;

  onSubmit() {
    console.log(this.userForm);
  }
}
```

### 3. Add Form Control 
- In Template-Driven Forms, every input you want tracked must have:
* A **`name`** attribute (required for `NgForm` to register it). 
* The **`ngModel`** directive to bind the value. 
* Optionally, a **template reference** like `#controlName="ngModel"` to check its validation state.
```html
<form #userForm="ngForm" (ngSubmit)="onSubmit()">
  <div>
    <label>Name:</label>
    <input name="name" ngModel required #nameCtrl="ngModel">
    <div *ngIf="nameCtrl.invalid && nameCtrl.touched">
      Name is required.
    </div>
  </div>

  <div>
    <label>Email:</label>
    <input name="email" ngModel type="email" required #emailCtrl="ngModel">
    <div *ngIf="emailCtrl.invalid && emailCtrl.touched">
      Valid email is required.
    </div>
  </div>

  <button type="submit">Submit</button>
</form>
```


---

## Key Points

- Use **Template-Driven Forms** for small/simple forms.
- Always **import `FormsModule`** when using `ngModel`.
- Angular handles **binding, validation, and state tracking** automatically.
- For large/complex forms, prefer **Reactive Forms**.
