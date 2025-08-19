
# Angular JWT Authentication

This document explains **step-by-step** how the authentication works.

## ​​​ Auth Service – Logging in a user

```ts
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, map, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class Auth {
  private http = inject(HttpClient);
  private URL = "http://localhost:5000/users";

  login(email: string, password: string) {
    return this.http.post<any>(`${this.URL}/login`, { email, password }).pipe(
      map((response) => response.token),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    let errorResponse = {
      status: "fail",
      message: "An unknown error has occurred",
    };

    if (error.error && error.error.status && error.error.message) {
      errorResponse = {
        status: error.error.status,
        message: error.error.message,
      };
    }

    return throwError(() => errorResponse);
  }
}
````

**What this code does as a whole:**

* Sends a `POST` request to the backend with `email` and `password`.
* If successful, extracts the `token` from the backend response using `map`.
* If an error occurs, `catchError` handles it and returns a user-friendly error.

---

## Using Auth Service in a Login Component

```html
<button type="button" (click)="onLogin()">Login</button>
```

```ts
import { Component, inject } from "@angular/core";
import { Auth } from "../services/auth";

@Component({
  selector: "app-login",
  templateUrl: "./login.html",
  styleUrls: ["./login.css"],
})
export class Login {
  private authService = inject(Auth);

  onLogin(email: string = "frnt@gmail.com", password: string = "12345678") {
    this.authService.login(email, password).subscribe({
      next: (token) => console.log(token),
      error: (error) => console.log(error),
    });
  }
}
```

**What this code does as a whole:**

* Injects the `Auth` service.
* Calls login with default credentials when clicked.
* Logs the token if successful, or logs the error if not.

---

## UserModel – Storing and validating tokens

```ts
export class UserModel {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _expiresIn: Date
  ) {}

  get token(): string | null {
    if (!this._expiresIn || this._expiresIn < new Date()) {
      return null;
    }
    return this._token;
  }
}
```

**What this code does as a whole:**

* Represents logged-in user data.
* Keeps the token private and only returns it if it's still valid.
* Avoids sending expired tokens.

---

## Auth Service with BehaviorSubject, jwt-decode & localStorage

```ts
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, map, BehaviorSubject, throwError } from "rxjs";
import { UserModel } from "../models/user";
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: "root",
})
export class Auth {
  private http = inject(HttpClient);
  private URL = "http://localhost:5000/users";

  user = new BehaviorSubject<UserModel | null>(null);

  login(email: string, password: string) {
    return this.http.post<any>(`${this.URL}/login`, { email, password }).pipe(
      map((response) => {
        if (response.token) {
          const decoded = jwtDecode<any>(response.token);
          const expirationDate = new Date(decoded.exp * 1000);

          const loggedInUser = new UserModel(
            decoded.email,
            decoded.id,
            response.token,
            expirationDate
          );

          this.user.next(loggedInUser);
          localStorage.setItem("userData", JSON.stringify(loggedInUser));

          return response.data.user;
        } else {
          throw new Error("Token not found in response");
        }
      }),
      catchError(this.handleError)
    );
  }

// Called from AppComponent ngOnInit to restore logged-in user from localStorage on app start
  autoLogin() { 
    const userDataString = localStorage.getItem("userData");
    if (!userDataString) return;

    const userData = JSON.parse(userDataString);
    const loadedUser = new UserModel(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._expiresIn)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

// Called in any component
  logout() {
    this.user.next(null);
    localStorage.removeItem("userData");
  }

  private handleError(error: any) {
    let errorResponse = {
      status: "fail",
      message: "An unknown error has occurred",
    };

    if (error.error && error.error.status && error.error.message) {
      errorResponse = {
        status: error.error.status,
        message: error.error.message,
      };
    }

    return throwError(() => errorResponse);
  }
}
```

**Key concepts explained:**

* **BehaviorSubject** → Tracks the latest authenticated user globally.
* **jwt-decode** → Decodes the token to extract user data.
* **localStorage** → Persists user data across page refreshes.
* **autoLogin()** → Restores session if the token is valid.
* **logout()** → Clears storage and authentication state.

---

## User Service – Adding a movie to favorites

```ts
import { inject, Injectable } from "@angular/core";
import { Auth } from "./auth";
import { exhaustMap, map, Observable, take } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private authService = inject(Auth);
  private http = inject(HttpClient);
  private URL = "http://localhost:5000/users";

  addMovieToFav(movieId: string): Observable<string[]> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${user?.token}`,
        });

        return this.http
          .post<any>(`${this.URL}/add-fav`, { movieId }, { headers })
          .pipe(map((response) => response.data.favMovies));
      })
    );
  }
}
```

**What this code does as a whole:**

* Retrieves current user from BehaviorSubject.
* Attaches token in Authorization header.
* Sends movie ID to backend and returns updated favorites list.

---

## Calling addMovieToFav in a Component

```ts
private userService = inject(UserService);

addMovieToFav(movieId: string = '6898e282ff893e3d5b8ed89c') {
  this.userService.addMovieToFav(movieId).subscribe({
    next: (res) => console.log('Added:', res),
    error: (err) => console.error(err),
  });
}
```

---

## Sign Up

```ts
signup(newUser: any) {
  return this.http.post<any>(`${this.URL}/signup`, newUser).pipe(
    map((response) => {
      if (response.token) {
        const decoded = jwtDecode<any>(response.token);
        const expirationDate = new Date(decoded.exp * 1000);
        const loggedInUser = new UserModel(
          decoded.email,
          decoded.id,
          response.token,
          expirationDate
        );
        this.user.next(loggedInUser);
        localStorage.setItem("userData", JSON.stringify(loggedInUser));

        return response.data.user;
      } else {
        throw new Error('Token not found in response');
      }
    }),
    catchError(this.handleError)
  );
}
```

