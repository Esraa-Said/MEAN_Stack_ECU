# Link BackEnd With FrontEnd

## 📘 `movie.model.ts`

```ts
export interface Movie {
  _id?: string;
  name: string;
  language: string;
  description: string;
  duration: number;
  ratings: number;
  totalRatings: number;
  releaseYear: number;
  releaseDate: string;
  createdAt?: string;
  genres: string[];
  directors: string[];
  coverImage: string;
  trailerUrl?: string;
  actors: string[];
  price: number;
  isAvailable: boolean;
}
```

---


## Providing HttpClient through dependency injection

- `HttpClient` is provided using the `provideHttpClient` helper function, which most apps include in the application providers in `app.config.ts`.

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

---

### 1- Get All Movies

- Movie Service

```ts
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Movie } from "../models/movie";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class MovieService {
  private http = inject(HttpClient);

  private URL = "http://localhost:5000/movies";

  getMovies(): Observable<Movie[]> {
    return this.http
      .get<any>(this.URL)
      .pipe(map((response) => response.data.movies));
  }
}
```

---

- Movie List Component

```ts
import { Component, OnInit } from "@angular/core";
import { MovieService } from "../services/movie";
import { Movie } from "../models/movie";

@Component({
  selector: "app-movie-list",
  imports: [],
  templateUrl: "./movie-list.html",
  styleUrl: "./movie-list.css",
})
export class MovieList implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.movieService.getMovies().subscribe({
      next: (data) => {
        console.log(data);
        this.movies = data;
      },
    });
  }
}
```

---

- Solve `cors` problem

```bash
npm install cors
```

```js
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:4200", // allow just your Angular app
    // or origin: '*' to allow any domain (not recommended for production)
  })
);
```

---

- Movie List Component
  - Change `movie.id` ===> `movie_id`
  - Change `id` to `_id? : string` in `movie-model.ts`
  - Make Sure you have a movie with the `movie.coverImage` in `upload` folder.
  - Look How To Show Image ===> <img [src]="'http://localhost:5000/uploads/' + movie.coverImage" >

```html
<h2 class="title">💖 Movie List</h2>
<button class="add-btn" (click)="addMovie()">➕ Add Movie</button>

<div class="movie-grid">
  @for (movie of movies; track movie._id) {
  <div class="movie-card">
    <img
      [src]="'http://localhost:5000/uploads/' + movie.coverImage"
      alt="{{ movie.name }}"
      class="movie-img"
    />

    <div class="movie-info">
      <h3>
        {{ movie.name }} <span class="year">({{ movie.releaseYear }})</span>
      </h3>
      <p class="description">{{ movie.description }}</p>

      <p><strong>Language:</strong> {{ movie.language }}</p>
      <p><strong>Duration:</strong> {{ movie.duration }} mins</p>
      <p>
        <strong>Ratings:</strong> ⭐ {{ movie.ratings }} / 5 ({{
        movie.totalRatings }} reviews)
      </p>
      <p><strong>Genres:</strong> {{ movie.genres.join(', ') }}</p>
      <p><strong>Directors:</strong> {{ movie.directors.join(', ') }}</p>
      <p><strong>Actors:</strong> {{ movie.actors.join(', ') }}</p>
      <p><strong>Release Date:</strong> {{ movie.releaseDate }}</p>
      <p><strong>Price:</strong> ${{ movie.price }}</p>
      <p>
        <strong>Available:</strong>
        <span
          [class.available]="movie.isAvailable"
          [class.unavailable]="!movie.isAvailable"
        >
          {{ movie.isAvailable ? 'Yes' : 'No' }}
        </span>
      </p>

      <div class="btn-group">
        @if (movie.trailerUrl) {
        <a [href]="movie.trailerUrl" target="_blank" class="trailer-btn"
          >🎥 Watch Trailer</a
        >
        }
        <button class="update-btn" (click)="updateMovie(movie._id)">
          ✏️ Update
        </button>
        <button class="delete-btn" (click)="deleteMovie(movie._id)">
          🗑 Delete
        </button>
      </div>
    </div>
  </div>
  }
</div>
```

---

```css
.title {
  text-align: center;
  font-size: 2rem;
  margin: 20px 0;
  color: #e91e63;
}

.add-btn {
  display: block;
  margin: 0 auto 30px;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #4caf50;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: 0.3s;
}

.add-btn:hover {
  background-color: #45a049;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 0 20px 40px;
}

.movie-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  transition: transform 0.3s, box-shadow 0.3s;
}

.movie-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.18);
}

.movie-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.movie-info {
  padding: 15px;
}

.movie-info h3 {
  font-size: 1.2rem;
  margin-bottom: 8px;
  color: #333;
}

.movie-info .year {
  font-weight: normal;
  font-size: 0.9rem;
  color: #777;
}

.movie-info p {
  margin: 4px 0;
  font-size: 0.9rem;
  color: #555;
}

.movie-info strong {
  color: #222;
}

.available {
  color: #4caf50;
  font-weight: bold;
}

.unavailable {
  color: #f44336;
  font-weight: bold;
}

.btn-group {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.btn-group button,
.trailer-btn {
  flex: 1;
  text-align: center;
  padding: 8px 10px;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: 0.3s;
}

.trailer-btn {
  background-color: #2196f3;
  color: white;
  text-decoration: none;
}

.trailer-btn:hover {
  background-color: #1976d2;
}

.update-btn {
  background-color: #ff9800;
  color: white;
}

.update-btn:hover {
  background-color: #e68900;
}

.delete-btn {
  background-color: #f44336;
  color: white;
}

.delete-btn:hover {
  background-color: #d32f2f;
}
```

---

---

---

### 2- Post Movie

- Movie service

```ts
addMovie(movie: Movie): Observable<Movie> {

   return this.http.post<any>(this.URL, movie).pipe(map(response=> response.data.movie))
  }
```

---

- Movie List component

```ts
  addMovie() {
    const newMovie: Movie = JSON.parse(`{
    "name": "Edge of Tomorrow",
    "language": "English",
    "description": "A soldier fighting aliens gets to relive the same day over and over again.",
    "duration": 113,
    "ratings": 4.2,
    "totalRatings": 4823,
    "releaseYear": 2014,
    "releaseDate": "2014-06-06T00:00:00Z",
    "genres": ["Action", "Sci-Fi"],
    "directors": ["Doug Liman"],
    "coverImage": "https://example.com/edge-of-tomorrow.jpg",
    "trailerUrl": "https://youtube.com/example-trailer",
    "actors": ["Tom Cruise", "Emily Blunt"],
    "price": 7.99,
    "isAvailable": true
  }`);

    this.movieService
      .addMovie(newMovie)
      .subscribe({ next: (data) =>
        {
          console.log(data);
          this.movies.push(data)
         }
  });
  }
```

---

---

### 3- Update Movie

- Movie Service

```ts
updateMovie(id: number, updatedData: Partial<Movie>): Observable<Movie> {
   return this.http.patch<any>(`${this.URL}/${id}`, updatedData).pipe(map(response => response.data.movie));
  }
```

---

- Movie List

```ts
  updateMovie(id: number, index: number) {
    this.movieService.updateMovie(id, { name: 'Updated Title' }).subscribe({
      next: (data) => {
        console.log(data);

        this.movies[index] = data;
      },
    });
  }
```
---

---

### 3- Delete Movie

- Movie Service

```ts
  deleteMovie(id: number): Observable<Movie> {
    return this.http.delete<any>(`${this.URL}/${id}`).pipe(map(response => response.data.movie));
  }
```

---

- Movie List

```ts
deleteMovie(id: number, index: number) {
    this.movieService.deleteMovie(id).subscribe({
      next: (data) => {
        console.log(data);

        this.movies.splice(index, 1);
      },
    });
  }
```

## Query String
```ts
  getMovies(page: number = 1, limit: number = 5): Observable<Movie[]> {
    return this.http.get<any>(`${this.URL}?page=${page}&limit=${limit}`).pipe(map(response=> response.data.movies))
  }
```
```ts
loadMovies() {
    this.movieService.getMovies(2, 6).subscribe({
      next: (data) => {
        console.log(data);
        this.movies = data;
      },
    });
  }
  ```



## How To Handle The Errors
- use `catchError`
```ts
import { inject, Injectable } from '@angular/core';
import { map, Observable, catchError, throwError } from 'rxjs';
import { Movie } from '../models/movie';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private http = inject(HttpClient);
  private URL = 'http://localhost:5000/movies';
  
  private handleError(error: any) {
    console.error('API error occurred:', error);
    return throwError(() => new Error(error?.error?.message || 'Something went wrong, please try again.'));
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get<any>(this.URL).pipe(
      map(response => response.data.movies),
      catchError(this.handleError)
    );
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<any>(this.URL, movie).pipe(
      map(response => response.data.movie),
      catchError(this.handleError)
    );
  }

  updateMovie(id: number, updatedData: Partial<Movie>): Observable<Movie> {
    return this.http.patch<any>(`${this.URL}/${id}`, updatedData).pipe(
      map(response => response.data.movie),
      catchError(this.handleError)
    );
  }

  deleteMovie(id: number): Observable<Movie> {
    return this.http.delete<any>(`${this.URL}/${id}`).pipe(
      map(response => response.data.movie),
      catchError(this.handleError)
    );
  }
}
```

---
- Use `error` callback function
```ts
import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-movie-list',
  imports: [],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
})
export class MovieList implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.movieService.getMovies().subscribe({
      next: (data) => {
        console.log(data);
        this.movies = data;
      },
      error: (err) => {
        console.error('Error loading movies:', err.message);
        alert(err.message);
      },
    });
  }

  addMovie() {
    const newMovie: Movie = JSON.parse(`{
    "name": "Edge of Tomorrow",
    "language": "English",
    "description": "A soldier fighting aliens gets to relive the same day over and over again.",
    "duration": 113,
    "ratings": 4.2,
    "totalRatings": 4823,
    "releaseYear": 2014,
    "releaseDate": "2014-06-06T00:00:00Z",
    "genres": ["Action", "Sci-Fi"],
    "directors": ["Doug Liman"],
    "coverImage": "https://example.com/edge-of-tomorrow.jpg",
    "trailerUrl": "https://youtube.com/example-trailer",
    "actors": ["Tom Cruise", "Emily Blunt"],
    "price": 7.99,
    "isAvailable": true
  }`);

    this.movieService.addMovie(newMovie).subscribe({
      next: (data) => {
        console.log(data);
        this.movies.push(data);
      },
      error: (err) => {
        console.error('Error adding movie:', err.message);
        alert(err.message);
      },
    });
  }

  updateMovie(id: number, index: number) {
    this.movieService.updateMovie(id, { name: 'Updated Title' }).subscribe({
      next: (data) => {
        console.log(data);

        this.movies[index] = data;
      },
      error: (err) => {
        console.error('Error updating movie:', err.message);
        alert(err.message);
      },
    });
  }

  deleteMovie(id: number, index: number) {
    this.movieService.deleteMovie(id).subscribe({
      next: (data) => {
        console.log(data);

        this.movies.splice(index, 1);
      },
      error: (err) => {
        console.error('Error deleting movie:', err.message);
        alert(err.message);
      },
    });
  }
}
```

