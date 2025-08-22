## Original HTML

```html
<section class="container">
  <header>Job Application Form</header>

  <form class="form">
    <div class="column">
      <div class="input-box">
        <input type="text" placeholder="Full Name" />
      </div>

      <div class="input-box">
        <input type="text" placeholder="Position Applying For" />
      </div>
    </div>

    <div class="input-box">
      <input type="email" placeholder="Email Address" />
    </div>

    <div class="column">
      <div class="input-box">
        <input type="number" placeholder="Phone Number" />
      </div>
      <div class="input-box">
        <input type="date" placeholder="Available Start Date" />
      </div>
    </div>

    <div class="input-box">
      <input type="text" placeholder="LinkedIn Profile" />
      <button class="btn-gen-username">Auto Fill from LinkedIn</button>
    </div>

    <div class="gender-box">
      <h3>Employment Type</h3>
      <div class="gender-option">
        <div class="gender">
          <input type="radio" id="full-time" name="employment" checked />
          <label for="full-time">Full-Time</label>
        </div>
        <div class="gender">
          <input type="radio" id="part-time" name="employment" />
          <label for="part-time">Part-Time</label>
        </div>
        <div class="gender">
          <input type="radio" id="contract" name="employment" />
          <label for="contract">Contract</label>
        </div>
      </div>
    </div>

    <div class="input-box address">
      <label>Address</label>
      <input type="text" placeholder="Street Address" />
      <input type="text" placeholder="Street Address Line 2" />
      <div class="column">
        <div class="select-box">
          <select name="country">
            <option hidden>Country</option>
            <option>USA</option>
            <option>UK</option>
            <option>Canada</option>
            <option>Australia</option>
          </select>
        </div>
        <input type="text" placeholder="City" />
      </div>
      <div class="column">
        <input type="text" placeholder="State / Region" />
        <input type="number" placeholder="Postal Code" />
      </div>
    </div>

    <div class="input-box">
      <textarea placeholder="Why should we hire you?"></textarea>
    </div>

    <input type="button" value="Submit Application" class="submit-btn" />
  </form>
</section>
```

---

## Original CSS

```css
.container {
  max-width: 650px;
  margin: 40px auto;
  background: #fff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

header {
  font-size: 22px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.column {
  display: flex;
  gap: 15px;
}

.input-box {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.input-box input,
.input-box select,
.input-box textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.input-box input:focus,
.input-box select:focus,
.input-box textarea:focus {
  border-color: #007bff;
  outline: none;
}

.btn-gen-username {
  margin-top: 8px;
  padding: 8px;
  border: none;
  background: #28a745;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.btn-gen-username:hover {
  background: #218838;
}

.gender-box h3 {
  margin-bottom: 8px;
  font-size: 16px;
  color: #444;
}

.gender-option {
  display: flex;
  gap: 20px;
}

.gender {
  display: flex;
  align-items: center;
  gap: 6px;
}
.address * {
  margin-bottom: 10px;
}
.address label {
  margin-bottom: 5px;
  font-weight: bold;
  color: #444;
}

.select-box select {
  width: 100%;
}

textarea {
  resize: none;
  height: 80px;
}

.submit-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
}

.submit-btn:hover {
  background: #0056b3;
}
```

---

## **Step 1 – Basic Angular Form Setup**

```html
<!-- 
We use (ngSubmit) to call a method when the form is submitted.
#jobForm="ngForm" creates a local template reference variable with type ngForm not normal html form that gives us access to the form object and all its state (valid, touched, dirty, etc.).
-->
<form class="form" (ngSubmit)="onSubmitForm()" #jobForm="ngForm">
  <!-- Submit button to trigger form submission -->
  <input type="submit" value="Submit Application" class="submit-btn" />
</form>
```

```ts
/*
@ViewChild("jobForm") lets us access the form in the component's TypeScript code
NgForm is the Angular object that represents the form and all its controls
*/
import { Component, ViewChild } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";

@Component({
  selector: "app-template-driven-form",
  imports: [FormsModule],
  templateUrl: "./template-driven-form.html",
  styleUrl: "./template-driven-form.css",
})
export class TemplateDrivenForm {
  @ViewChild("jobForm") jobForm!: NgForm; // Get The Form As TDF
  onSubmitForm() {
    // Will run when form is submitted
  }
}
```

---

## **Step 2 – Adding `name` Attributes**

```html
<!-- 
Angular requires a "name" for each form control so it can track it.
Radio buttons that belong to the same group share the same name.
Submit buttons do NOT need a name.
-->
```

```html
<form class="form" (ngSubmit)="onSubmitForm()" #jobForm="ngForm">
  <div class="column">
    <div class="input-box">
      <input type="text" placeholder="Full Name" name="fullName" />
    </div>

    <div class="input-box">
      <input type="text" placeholder="Position Applying For" name="position" />
    </div>
  </div>

  <div class="input-box">
    <input type="email" placeholder="Email Address" name="email" />
  </div>

  <div class="column">
    <div class="input-box">
      <input type="number" placeholder="Phone Number" name="phone" />
    </div>
    <div class="input-box">
      <input type="date" placeholder="Available Start Date" name="startDate" />
    </div>
  </div>

  <div class="input-box">
    <input type="text" placeholder="LinkedIn Profile" name="linkedin" />
    <button class="btn-gen-username">Auto Fill from LinkedIn</button>
  </div>

  <div class="gender-box">
    <h3>Employment Type</h3>
    <div class="gender-option">
      <div class="gender">
        <input
          type="radio"
          id="full-time"
          value="Full-Time"
          name="employment"
          checked
        />
        <label for="full-time">Full-Time</label>
      </div>
      <div class="gender">
        <input
          type="radio"
          id="part-time"
          value="Part-Time"
          name="employment"
        />
        <label for="part-time">Part-Time</label>
      </div>
      <div class="gender">
        <input type="radio" id="contract" value="Contract" name="employment" />
        <label for="contract">Contract</label>
      </div>
    </div>
  </div>

  <div class="input-box address">
    <label>Address</label>
    <input type="text" placeholder="Street Address" name="street1" />
    <input type="text" placeholder="Street Address Line 2" name="street2" />
    <div class="column">
      <div class="select-box">
        <select name="country">
          <option hidden>Country</option>
          <option>USA</option>
          <option>UK</option>
          <option>Canada</option>
          <option>Australia</option>
        </select>
      </div>
      <input type="text" placeholder="City" name="city" />
    </div>
    <div class="column">
      <input type="text" placeholder="State / Region" name="state" />
      <input type="number" placeholder="Postal Code" name="postalCode" />
    </div>
  </div>

  <div class="input-box">
    <textarea placeholder="Why should we hire you?" name="textarea"></textarea>
  </div>

  <input type="submit" value="Submit Application" class="submit-btn" />
</form>
```

## **Step 3 – Using `ngModel` to Make Form Controls**

```html
<!-- 
Adding ngModel:
1. Creates a FormControl automatically.
2. Allows two-way data binding with component variables.
3. Lets us validate and check the control's state (valid, touched, dirty).
-->
```

```html
<form class="form" (ngSubmit)="onSubmitForm()" #jobForm="ngForm">
  <div class="column">
    <div class="input-box">
      <input type="text" placeholder="Full Name" name="fullName" ngModel />
    </div>

    <div class="input-box">
      <input
        type="text"
        placeholder="Position Applying For"
        name="position"
        ngModel
      />
    </div>
  </div>

  <div class="input-box">
    <input type="email" placeholder="Email Address" name="email" ngModel />
  </div>

  <div class="column">
    <div class="input-box">
      <input type="number" placeholder="Phone Number" name="phone" ngModel />
    </div>
    <div class="input-box">
      <input
        type="date"
        placeholder="Available Start Date"
        name="startDate"
        ngModel
      />
    </div>
  </div>

  <div class="input-box">
    <input type="text" placeholder="LinkedIn Profile" name="linkedin" ngModel />
    <button class="btn-gen-username">Auto Fill from LinkedIn</button>
  </div>

  <div class="gender-box">
    <h3>Employment Type</h3>
    <div class="gender-option">
      <div class="gender">
        <input
          type="radio"
          id="full-time"
          value="Full-Time"
          name="employment"
          ngModel
          checked
        />
        <label for="full-time">Full-Time</label>
      </div>
      <div class="gender">
        <input
          type="radio"
          id="part-time"
          value="Part-Time"
          name="employment"
          ngModel
        />
        <label for="part-time">Part-Time</label>
      </div>
      <div class="gender">
        <input
          type="radio"
          id="contract"
          value="Contract"
          name="employment"
          ngModel
        />
        <label for="contract">Contract</label>
      </div>
    </div>
  </div>

  <div class="input-box address">
    <label>Address</label>
    <input type="text" placeholder="Street Address" name="street1" ngModel />
    <input
      type="text"
      placeholder="Street Address Line 2"
      name="street2"
      ngModel
    />
    <div class="column">
      <div class="select-box">
        <select name="country">
          <option hidden>Country</option>
          <option>USA</option>
          <option>UK</option>
          <option>Canada</option>
          <option>Australia</option>
        </select>
      </div>
      <input type="text" placeholder="City" name="city" ngModel />
    </div>
    <div class="column">
      <input type="text" placeholder="State / Region" name="state" ngModel />
      <input
        type="number"
        placeholder="Postal Code"
        name="postalCode"
        ngModel
      />
    </div>
  </div>

  <div class="input-box">
    <textarea
      placeholder="Why should we hire you?"
      name="textarea"
      ngModel
    ></textarea>
  </div>

  <input type="submit" value="Submit Application" class="submit-btn" />
</form>
```

---

## **Step 4 – Form State Properties (`touched`, `dirty`, `valid`)**

```html
<!-- How To Access Properties: -->
<!-- form-reference-template.property-name -->
```

**1- `touched`**

- Form is considered `touched` if any of its `form controls` is `focused`.

```html
<!-- Add a CSS class when form is touched -->

<section
  class="container"
  [class.touched-form-shadow]="jobForm.touched"
></section>
```

```css
/* If form has been touched, highlight with red border */
.touched-form-shadow {
  border: 1px solid red;
}
```

---

**2- `valid`**

- Form is considered `valid` if all of its `form controls` **pass** their validation.
- Form is considered `invalid` if at least one of its `form controls` **fails** its validation.

```html
<!-- Required validation -->
<!-- Add `required` property to input element-->
<input type="text" placeholder="Full Name" name="fullName" ngModel required />

<!-- Disable submit if form is invalid -->
<input
  type="submit"
  value="Submit Application"
  class="submit-btn"
  [disabled]="!jobForm.valid"
  [style.backgroundColor]="!jobForm.valid ? 'gray' : '#007bff'"
/>
```

---

**3- `dirty`**

- A form is considered dirty if at least one of its form controls has been modified by the user.

```html
<form #jobForm="ngForm">
  <!-- Input -->
  <input type="text" placeholder="Full Name" name="fullName" ngModel required />

  <!-- Show dirty state -->
  <p *ngIf="jobForm.controls['fullName']?.dirty">
    You have modified this field.
  </p>
</form>
```

---

**Step 5 – Form Control State Properties (`touched`, `dirty`, `valid`)**

To access the state of a form control in **Template-Driven Forms**, you first need to give that form control a **template reference variable** linked to `ngModel`.

1. **Add `ngModel` to the input** – This connects the input to Angular’s form API.
2. **Give the input a reference variable** in the format:

```html
<!-- #variableName="ngModel" -->
<input
  type="text"
  placeholder="Full Name"
  name="fullName"
  ngModel
  <!--
  #fullname="ngModel"
  Here
  --
/>
required />
```

This allows you to access its properties like `.touched`, `.dirty`, `.valid` inside your template.

```html
<!-- How To Access Form Control Properties: -->
<!-- control-reference-template.property-name -->
```

**1- `touched`**

- A form control is considered `touched` if the user has focused and then blurred (left) the input field.

```html
<!-- Full Name Field -->
<div class="input-box" [class.touched-control-shadow]="fullname.touched">
  <input
    type="text"
    placeholder="Full Name"
    name="fullName"
    ngModel
    #fullname="ngModel"
  />
</div>

<!-- Email Field -->
<div class="input-box" [class.touched-control-shadow]="emailField.touched">
  <input
    type="email"
    placeholder="Email Address"
    name="email"
    ngModel
    #emailField="ngModel"
  />
</div>
```

```css
/* If control has been touched, highlight with red border */
.touched-control-shadow {
  border: 1px solid red;
}
```

---

**2- `valid`**

- A form control is considered `valid` if it passes all of its validation rules.
- A form control is considered `invalid` if it fails any of its validation rules.

```html
<!-- Disable Email field if Full Name is invalid -->
<div class="input-box" [class.valid-control-shadow]="fullname.valid">
  <input
    type="text"
    placeholder="Full Name"
    name="fullName"
    ngModel
    #fullname="ngModel"
    required
  />
</div>

<div class="input-box">
  <input
    type="email"
    placeholder="Email Address"
    name="email"
    ngModel
    #emailField="ngModel"
    required
    email
    [disabled]="!fullname.valid"
  />
</div>
```

```css
/* If control has been valid, highlight with green border */
.valid-control-shadow {
  border: 3px solid green;
}
```

---

**3- `dirty`**

- A form control is considered `dirty` if its value has been changed by the user.

```html
<div class="input-box" [class.dirty-control-shadow]="fullname.dirty">
  <input
    type="text"
    placeholder="Full Name"
    name="fullName"
    ngModel
    #fullname="ngModel"
    required
  />
</div>

<div class="input-box" [class.dirty-control-shadow]="emailField.dirty">
  <input
    type="email"
    placeholder="Email Address"
    name="email"
    ngModel
    #emailField="ngModel"
    required
    email
  />
</div>
```

```css
/* If control has been valid, highlight with green border */
.dirty-control-shadow {
  border: 3px solid yellow;
}
```

---

## **Step 6 – Styling Invalid Inputs with CSS Classes**

```css
/* Angular adds ng-invalid + ng-touched automatically */
input.ng-invalid.ng-touched {
  border: 2px solid red;
}
```

---

## **Step 7 – Showing Error Messages**

```html
<!-- Example: Required full name -->
<input
  type="text"
  placeholder="Full Name"
  name="fullName"
  ngModel
  #fname="ngModel"
  required
/>
@if (fname.invalid && fname.touched) {
<div>
  <small>*Full name is required.</small>
</div>
}
```

```html
<!-- Example: Required + Email format -->
<input
  type="email"
  placeholder="Email Address"
  name="email"
  ngModel
  #email="ngModel"
  required
  email
/>
@if (email.invalid && email.touched) {
<div>
  <small>*Valid Email is required.</small>
</div>
}
```

```css
small {
  color: red;
  font-weight: bold;
}
```

---

## **Step 7 – Grouping Fields with `ngModelGroup`**

**What to do first:**

1. Decide which inputs belong together logically (for example, address fields).
2. Wrap them in a parent container (`<div>` or similar).
3. Add `ngModelGroup="groupName"` to that container — this creates a sub-group inside the form.
4. Add a template reference variable (e.g., `#addressGroup="ngModelGroup"`) so you can check its state and validation in the template.
5. Inside that container, use `name` and `ngModel` on each input as usual.
6. Optionally, display error messages if the whole group is invalid and touched.

**Example:**

```html
<!-- Group address-related fields -->
<div
  class="input-box address"
  ngModelGroup="address"
  #addressGroup="ngModelGroup"
>
  <input type="text" placeholder="Street Address" name="street1" ngModel />
  <input
    type="text"
    placeholder="Street Address Line 2"
    name="street2"
    ngModel
  />
  <!-- Rest of example -->

  @if (addressGroup.invalid && addressGroup.touched) {
  <div>
    <small>*Some address fields are invalid</small>
  </div>
  }
</div>
```

---

## `setValue()` and `patchValue()`

In **Template-Driven Forms**, you can programmatically change form values from the TypeScript side.
Two main methods are:

- **`setValue()`** — sets the **entire** form’s value. You **must** provide all fields with the exact structure of the form, otherwise it will throw an error.
- **`patchValue()`** — sets **only part** of the form’s value. You can provide only the fields you want to update; the rest will remain unchanged.

---

## Setup Requirements

1. Make sure `FormsModule` is imported in your module:

```ts
import { FormsModule } from "@angular/forms";
@NgModule({
  imports: [FormsModule /* ... */],
})
export class AppModule {}
```

2. Add a form reference in your template so you can access it in TS:

```html
<form #jobForm="ngForm">...</form>
```

3. In your component:

```ts
@ViewChild('jobForm') jobForm!: NgForm;
```

---

## 1) `setValue()`

**When to use:**
Use `setValue()` when you have a **complete object** that matches the form structure exactly. Missing even one control will cause an error.

### Example — `setValue()`

**HTML (with testing buttons inside your form):**

```html
<form class="form" (ngSubmit)="onSubmitForm()" #jobForm="ngForm">
  <!-- Sample inputs -->
  <input type="text" placeholder="Full Name" name="fullName" ngModel />
  <input
    type="text"
    placeholder="Position Applying For"
    name="position"
    ngModel
  />
  <input type="email" placeholder="Email Address" name="email" ngModel />

  <!-- Address group -->
  <div ngModelGroup="address">
    <input type="text" placeholder="Street Address" name="street1" ngModel />
    <input
      type="text"
      placeholder="Street Address Line 2"
      name="street2"
      ngModel
    />
    <select name="country" ngModel>
      <option hidden>Country</option>
      <option>USA</option>
      <option>UK</option>
      <option>Canada</option>
      <option>Australia</option>
    </select>
    <input type="text" placeholder="City" name="city" ngModel />
    <input type="text" placeholder="State / Region" name="state" ngModel />
    <input type="number" placeholder="Postal Code" name="postalCode" ngModel />
  </div>

  <!-- Buttons for testing -->
  <button type="button" (click)="fillWithSetValue()">Fill (setValue)</button>
  <button type="button" (click)="fillWithPatchValue()">
    Fill (patchValue)
  </button>
  <input type="submit" value="Submit Application" />
</form>
```

**TypeScript:**

```ts
import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-job-form",
  templateUrl: "./job-form.component.html",
})
export class TemplateDrivenForm {
  @ViewChild("jobForm") jobForm!: NgForm;

  onSubmitForm() {
    console.log("Form value:", this.jobForm.value);
  }

  // setValue: must match the form structure exactly
  fillWithSetValue() {
    this.jobForm.form.setValue({
      fullName: "John Doe",
      position: "Frontend Developer",
      email: "john@example.com",
      phone: "123456789",
      startDate: "2025-09-01",
      linkedin: "https://linkedin.com/in/johndoe",
      employment: "Full-Time",
      address: {
        street1: "123 Main St",
        street2: "",
        country: "USA",
        city: "New York",
        state: "NY",
        postalCode: "10001",
      },
      textarea: "I am the perfect candidate for this role.",
    });
  }
}
```

---

## 2) `patchValue()`

**When to use:**
Use `patchValue()` when you want to update **only certain fields** without touching the rest. Perfect for partial data from an API.

### Example — `patchValue()`

```ts
  // patchValue: update only specific fields
  fillWithPatchValue() {
    this.jobForm.form.patchValue({
      fullName: 'Jane Smith',
      email: 'jane@example.com',
      address: {
        city: 'Los Angeles'
      }
      // other fields remain unchanged
    });
  }
```

---

Got it — in **Template-Driven Forms (TDF)**, resetting the form is super simple, and you can do it in a couple of ways.

---

## **Resetting a TDF Form**

### 1- Using `this.jobForm.reset()`

This resets **all fields** to empty values and clears their `dirty`, `touched`, and `valid` states.

```ts
resetForm() {
  this.jobForm.reset();
}
```

---

### 2- Reset with default values

If you want the form to reset to **some default values** (instead of completely empty):

```ts
resetFormWithDefaults() {
  this.jobForm.reset({
    employment: 'Full-Time',
    country: 'USA'
  });
}
```

---

## **Example in HTML**

```html
<form #jobForm="ngForm">
  <input type="text" name="fullName" placeholder="Full Name" ngModel />
  <input type="email" name="email" placeholder="Email Address" ngModel />

  <button type="button" (click)="resetForm()">Reset Empty</button>
  <button type="button" (click)="resetFormWithDefaults()">
    Reset with Defaults
  </button>
</form>
```

---

## Retrieve Form Data

```ts
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-job-form",
  templateUrl: "./job-form.component.html",
})
export class TemplateDrivenForm {
  formData: any = {};

  onSubmitForm(form: NgForm) {
    this.formData = { ...form.value };
    console.log("Retrieved Data:", this.formData);
  }
}
```
