# HTTP Basics & Angular Integration

## Introduction
**HTTP (HyperText Transfer Protocol)** is the protocol used by clients (browsers or apps) to communicate with servers.  
It works as a simple **request → response** system: a client sends an HTTP request and the server returns an HTTP response.


---

## HTTP Request — Main Parts

1. **URL (Uniform Resource Locator)**  
   The address of the resource, for example:
   ```
   https://api.example.com/users/5
   ```

2. **Method / Verb**  
   Common verbs:
   - `GET` — retrieve data
   - `POST` — create data
   - `PUT` — replace/update data
   - `PATCH` — partial update
   - `DELETE` — remove data

3. **Headers**  
   Extra metadata for the request, for example:
   - `Content-Type: application/json`
   - `Authorization: Bearer <token>`
   - `Accept: application/json`

4. **Request Body**  
   Data sent with the request (usually for `POST`, `PUT`, `PATCH`). Example JSON:
   ```json
   { "name": "Ahmed", "age": 25 }
   ```

---

## HTTP Response — Main Parts
- **Status Code** (e.g., `200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`, `500 Internal Server Error`)
- **Headers**
- **Body** (JSON, HTML, text, etc.)

---

## HttpClient

### 1) Enable HttpClientModule
In `app.config.ts` (or the module where you need HTTP):
```ts
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideHttpClient } from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(), // Here
  ],
};
```

### 2) Basic GET request
```ts
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  template: `<ul><li *ngFor="let u of users">{{ u.name }}</li></ul>`
})
export class UsersComponent implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('https://api.example.com/users')
      .subscribe({
        next: data => this.users = data,
        error: err => console.error('GET error', err)
      });
  }
}
```

### 3) Basic POST request
```ts
this.http.post('https://api.example.com/users', {
  name: 'Sara',
  age: 22
}).subscribe({
  next: res => console.log('Created', res),
  error: err => console.error('POST error', err)
});
```

### 4) Sending headers or params
```ts
import { HttpHeaders, HttpParams } from '@angular/common/http';

const headers = new HttpHeaders().set('Authorization', 'Bearer TOKEN');
const params = new HttpParams().set('page', '1');

this.http.get('https://api.example.com/items', { headers, params })
  .subscribe(result => console.log(result));
```
