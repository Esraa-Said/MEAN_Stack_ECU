# Login Form

```html
<section class="card">
  <h2>Login</h2>

  <form #loginForm="ngForm" (ngSubmit)="onSubmit()">
    <div class="field">
      <label>Email</label>
      <input
        type="email"
        name="email"
        ngModel
        required
        email
        #emailRef="ngModel"
      />
      @if (emailRef.invalid && emailRef.touched) {
      <p class="error">Valid email is required</p>
      }
    </div>

    <div class="field">
      <label>Password</label>
      <input
        type="password"
        name="password"
        ngModel
        required
        minlength="8"
        #passwordRef="ngModel"
      />
      @if (passwordRef.invalid && passwordRef.touched) {
      <p class="error">Password is required with minimum length 8</p>
      }
    </div>

    <button type="submit" [disabled]="loginForm.invalid || loading">
      {{ loading ? 'Signing in...' : 'Login' }}
    </button>

    @if (serverError) {
    <p class="server-error">{{ serverError }}</p>
    }
  </form>
</section>
```

---

```css
.card {
  max-width: 420px;
  margin: 2rem auto;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  background: #fff;
}
h2 {
  margin: 0 0 1rem;
  font-size: 1.25rem;
}
.field {
  display: grid;
  gap: 0.35rem;
  margin-bottom: 1rem;
}
label {
  font-size: 0.9rem;
  color: #374151;
}
input {
  padding: 0.6rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  outline: none;
}
input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}
button {
  width: 100%;
  padding: 0.7rem;
  border: none;
  border-radius: 12px;
  background: #6366f1;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}
button[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}
.error {
  color: #b91c1c;
  font-size: 0.8rem;
}
.server-error {
  margin-top: 0.75rem;
  color: #b91c1c;
  font-size: 0.9rem;
  text-align: center;
}
```

---

```ts
import { Component, inject, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "../services/auth-service";
import { UserService } from "../services/user-service";
import { FormsModule, NgForm } from "@angular/forms";

@Component({
  selector: "app-login",
  imports: [FormsModule],
  templateUrl: "./login.html",
  styleUrl: "./login.css",
})
export class Login {
  loading = false;
  serverError = "";

  private authService = inject(AuthService);

  @ViewChild("loginForm") loginForm!: NgForm;

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.loading = true;
    this.serverError = "";

    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: () => {
        this.loading = false;
        this.loginForm.reset();
      },
      error: (err) => {
        this.loading = false;
        this.serverError = err.message;
      },
    });
  }
}
```

---

# Sign up Form

```html
<section class="card">
  <h2>Sign Up</h2>

  <form #signUpForm="ngForm" (ngSubmit)="onSubmit()" novalidate>
    <div class="field">
      <label>Name</label>
      <input
        type="text"
        name="name"
        ngModel
        required
        minlength="3"
        #nameRef="ngModel"
      />
      @if (nameRef.invalid && nameRef.touched) {
      <p class="error">Name is required with minimum length 3</p>
      }
    </div>

    <div class="field">
      <label>Email</label>
      <input
        type="email"
        name="email"
        ngModel
        required
        email
        #emailRef="ngModel"
      />
      @if (emailRef.invalid && emailRef.touched) {
      <p class="error">Valid email is required</p>
      }
    </div>

    <div class="field">
      <label>Password</label>
      <input
        type="password"
        name="password"
        ngModel
        required
        minlength="8"
        #passwordRef="ngModel"
      />
      @if (passwordRef.invalid && passwordRef.touched) {
      <p class="error">Password is required with minimum length 8</p>
      }
    </div>

    <div class="field">
      <label>Confirm Password</label>
      <input
        type="password"
        name="confirmPassword"
        ngModel
        required
        minlength="8"
        #confirmRef="ngModel"
      />
      @if (confirmRef.invalid && confirmRef.touched) {
      <p class="error">Confirm your password</p>
      } @if (passwordMismatch) {
      <p class="error">Passwords do not match</p>
      }
    </div>

    <div class="field">
      <label>Photo</label>
      <input type="file" (change)="onFileSelected($event)" accept="image/*" />
      @if (!selectedFileName) {
      <p class="hint">No file chosen</p>
      } @if (selectedFileName) {
      <p class="hint">{{ selectedFileName }}</p>
      }
    </div>

    <button type="submit" [disabled]="signUpForm.invalid || loading">
      {{ loading ? "Creating..." : "Create Account" }}
    </button>

    @if (serverError) {
    <p class="server-error">{{ serverError }}</p>
    } @if (serverSuccess) {
    <p class="server-success">{{ serverSuccess }}</p>
    }
  </form>
</section>
```

---

```css
.card {
  max-width: 520px;
  margin: 2rem auto;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  background: #fff;
}
h2 {
  margin: 0 0 1rem;
  font-size: 1.25rem;
}
.field {
  display: grid;
  gap: 0.35rem;
  margin-bottom: 1rem;
}
label {
  font-size: 0.9rem;
  color: #374151;
}
input[type="text"],
input[type="email"],
input[type="password"] {
  padding: 0.6rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  outline: none;
}
input:focus {
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
}
input[type="file"] {
  padding: 0.4rem 0;
}
button {
  width: 100%;
  padding: 0.7rem;
  border: none;
  border-radius: 12px;
  background: #10b981;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}
button[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}
.error {
  color: #b91c1c;
  font-size: 0.8rem;
}
.hint {
  color: #6b7280;
  font-size: 0.85rem;
}
.server-error {
  margin-top: 0.75rem;
  color: #b91c1c;
  font-size: 0.9rem;
  text-align: center;
}
.server-success {
  margin-top: 0.75rem;
  color: #065f46;
  font-size: 0.95rem;
  text-align: center;
}
```

---

```ts
import { Component, inject, ViewChild } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { AuthService } from "../services/auth-service";

@Component({
  selector: "app-signup",
  imports: [FormsModule],
  templateUrl: "./signup.html",
  styleUrl: "./signup.css",
})
export class Signup {
  loading = false;
  serverError = "";
  serverSuccess = "";
  selectedFile: File | null = null;
  selectedFileName = "";
  passwordMismatch = false;

  private authService = inject(AuthService);
  @ViewChild("signUpForm") signUpForm!: NgForm;

  onFileSelected(e: Event) {
    console.log(e);

    const input = e.target as HTMLInputElement;

    this.selectedFile = input.files?.[0] || null;
    this.selectedFileName = this.selectedFile?.name || "";
  }

  onSubmit() {
    if (this.signUpForm.invalid) return;

    const { name, email, password, confirmPassword } = this.signUpForm.value;
    this.passwordMismatch = password !== confirmPassword;
    if (this.passwordMismatch) return;

    const fd = new FormData();
    fd.append("name", name);
    fd.append("email", email);
    fd.append("password", password);
    fd.append("confirmPassword", confirmPassword); // should handle in front instead of back
    if (this.selectedFile) fd.append("photo", this.selectedFile);

    this.loading = true;
    this.serverError = "";
    this.serverSuccess = "";

    this.authService.signup(fd).subscribe({
      next: (user) => {
        console.log(user);
        this.loading = false;
        this.serverSuccess = "Account created successfully";
        this.signUpForm.reset();
        this.selectedFile = null;
        this.selectedFileName = "";
      },
      error: (err) => {
        this.loading = false;
        this.serverError = err.message;
      },
    });
  }
}
```
