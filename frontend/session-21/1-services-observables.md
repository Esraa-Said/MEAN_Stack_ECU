# 🎬 Movie Manager

## 📁 File Structure

```
src/
├── app/
│   ├── models
│   │   └── movie.model.ts
│   ├── services
│   │   └── movie.service.ts
│   ├── components
│   │   ├── movie-list
│   │   │   ├── movie-list.component.ts
│   │   │   ├── movie-list.component.html
│   │   │   └── movie-list.component.css
│   └── app.component.ts
│   └── app.component.html
```

---

## 📘 1. `movie.model.ts`

```ts
export interface Movie {
  id: number;
  name: string;
  language: string;
  description: string;
  duration: number;
  ratings: number;
  totalRatings: number;
  releaseYear: number;
  releaseDate: string;
  createdAt: string;
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

## 💼 2. `movie.service.ts`

```ts
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Movie } from "../models/movie.model";

@Injectable({ providedIn: "root" })
export class MovieService {
  private movies: Movie[] = [
    {
      id: 1,
      name: "Inception",
      language: "English",
      description: "A mind-bending thriller",
      duration: 148,
      ratings: 4.8,
      totalRatings: 2000,
      releaseYear: 2010,
      releaseDate: "2010-07-16",
      createdAt: new Date().toISOString(),
      genres: ["Sci-Fi", "Thriller"],
      directors: ["Christopher Nolan"],
      coverImage: "assets/Interstellar.png",
      trailerUrl: "https://youtu.be/YoHD9XEInc0",
      actors: ["Leonardo DiCaprio", "Elliot Page"],
      price: 12.99,
      isAvailable: true,
    },
  ];

  getMovies(): Observable<Movie[]> {
    return new Observable((observer) => {
      observer.next(this.movies);
    });
  }

  addMovie(movie: Movie): Observable<Movie[]> {
    return new Observable((observer) => {
      this.movies.push(movie);
      observer.next(this.movies);
    });
  }

  updateMovie(id: number, updatedData: Partial<Movie>): Observable<Movie[]> {
    return new Observable((observer) => {
      const index = this.movies.findIndex((m) => m.id === id);
      if (index !== -1) {
        this.movies[index] = { ...this.movies[index], ...updatedData };
      }
      observer.next(this.movies);
    });
  }

  deleteMovie(id: number): Observable<Movie[]> {
    return new Observable((observer) => {
      this.movies = this.movies.filter((m) => m.id !== id);
      observer.next(this.movies);
    });
  }
}
```

---

## 🎬 3. `movie-list.component.ts`

```ts
import { Component, OnInit } from "@angular/core";
import { MovieService } from "../../services/movie.service";
import { Movie } from "../../models/movie.model";

@Component({
  selector: "app-movie-list",
  templateUrl: "./movie-list.component.html",
  styleUrls: ["./movie-list.component.css"],
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.movieService.getMovies().subscribe({next: (data) => (this.movies = data)});
  }

  addMovie() {
    const newMovie: Movie = {
      id: Date.now(),
      name: "Interstellar",
      language: "English",
      description: "Journey beyond the stars",
      duration: 169,
      ratings: 4.7,
      totalRatings: 1800,
      releaseYear: 2014,
      releaseDate: "2014-11-07",
      createdAt: new Date().toISOString(),
      genres: ["Sci-Fi", "Adventure"],
      directors: ["Christopher Nolan"],
      coverImage: "assets/Interstellar.png",
      trailerUrl: "https://youtu.be/zSWdZVtXT7E",
      actors: ["Matthew McConaughey", "Anne Hathaway"],
      price: 14.99,
      isAvailable: true,
    };
    this.movieService
      .addMovie(newMovie)
      .subscribe({ next: (data) => (this.movies = data) });
  }

  updateMovie(id: number) {
    this.movieService
      .updateMovie(id, { name: "Updated Title" })
      .subscribe({ next: (data) => (this.movies = data) });
  }

  deleteMovie(id: number) {
    this.movieService
      .deleteMovie(id)
      .subscribe({ next: (data) => (this.movies = data) });
  }
}
```

---

## 📄 4. `movie-list.component.html`

```html
<h2>🎞 Movie List</h2>
<h2 class="title">💖 Movie List</h2>
<button class="add-btn" (click)="addMovie()">➕ Add Movie</button>

<div class="movie-grid">
  @for (movie of movies; track movie.id) {
  <div class="movie-card">
    <img [src]="movie.coverImage" alt="{{ movie.name }}" class="movie-img" />

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
        <button class="update-btn" (click)="updateMovie(movie.id)">
          ✏️ Update
        </button>
        <button class="delete-btn" (click)="deleteMovie(movie.id)">
          🗑 Delete
        </button>
      </div>
    </div>
  </div>
  }
</div>
```

---

## 🎨 5. `movie-list.component.css`

```css
.title {
  text-align: center;
  color: #d63384;
  font-size: 2rem;
  margin-bottom: 15px;
}

.add-btn {
  display: block;
  margin: 0 auto 20px;
  padding: 10px 15px;
  background-color: #ff85a2;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;
}
.add-btn:hover {
  background-color: #d63384;
}

.movie-grid {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 100px 0;
}

.movie-card {
  background: #fff0f5;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(255, 105, 180, 0.2);
  transition: transform 0.3s ease;
}
.movie-card:hover {
  transform: translateY(-5px);
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
  margin: 0;
  color: #d63384;
}
.year {
  font-size: 0.9rem;
  color: #888;
}

.description {
  font-style: italic;
  margin: 8px 0;
  color: #555;
}

.available {
  color: green;
  font-weight: bold;
}
.unavailable {
  color: red;
  font-weight: bold;
}

.btn-group {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 10px;
}

.update-btn,
.delete-btn,
.trailer-btn {
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  border: none;
  text-decoration: none;
  transition: 0.3s;
}

.update-btn {
  background-color: #ffd6e0;
  color: #d63384;
}
.update-btn:hover {
  background-color: #ffc0cb;
}

.delete-btn {
  background-color: #ffe4e1;
  color: #ff4d6d;
}
.delete-btn:hover {
  background-color: #ffb6c1;
}

.trailer-btn {
  background-color: #d63384;
  color: white;
}
.trailer-btn:hover {
  background-color: #a61c66;
}
```

---

## 🧩 6. `app.component.html`

```html
<app-movie-list></app-movie-list>
```
