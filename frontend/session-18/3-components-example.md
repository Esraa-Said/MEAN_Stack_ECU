## --- header.component.html ---
```html
<header>
  <h1>Welcome to MyApp</h1>
</header>
```
## --- header.component.css ---
```css
header {
  background-color: #fdd;
  padding: 10px;
  text-align: center;
}
```
## --- navigation.component.html ---
```html
<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Services</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>
```

## --- navigation.component.css ---
```css
nav {
  background-color: #dfd;
  padding: 10px;
}
nav ul {
  list-style: none;
  display: flex;
  gap: 15px;
  justify-content: center;
  padding: 0;
}
nav a {
  text-decoration: none;
  font-weight: bold;
}
```
## --- main.component.html ---
```html
<main>
  <h2>Main Content Area</h2>
  <p>This is the main section where content appears.</p>
</main>
```
## --- main.component.css ---
```css
main {
  background-color: #ddf;
  padding: 20px;

}
```

## --- side.component.html ---
```html
<aside>
  <h3>Sidebar</h3>
  <p>Some extra information or links.</p>
</aside>
```

## --- side.component.css ---
```css
aside {
  background-color: #def;
  padding: 20px;

}
```
## --- footer.component.html ---
```html
<footer>
  <p>&copy; 2025 MyApp. All rights reserved.</p>
</footer>
```
## --- footer.component.css ---
```css
footer {
  background-color: #e9d1f5;
  text-align: center;
  padding: 10px;
}
```

## --- app.component.html ---
```html
<div class="layout">
  <app-header></app-header>
  <app-navigation></app-navigation>
  <div class="content">
    <app-main></app-main>
    <app-side></app-side>
  </div>
  <app-footer></app-footer>
</div>
```
## --- app.component.css ---
```css
.layout {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-family: Arial, sans-serif;
 
}
.content {
  display: flex;
  gap: 10px;

}
app-main{
    flex: 3;
}
app-side{
    flex: 1;
}
```

