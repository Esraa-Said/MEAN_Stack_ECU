# Data Binding Tasks
## Products Management
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  products = [
    { id: 1, name: 'Laptop', price: 15000, likes: 0 },
    { id: 2, name: 'Smartphone', price: 8000, likes: 0 },
    { id: 3, name: 'Headphones', price: 500, likes: 0 }
  ];

  like(index: number) {
    this.products[index].likes++;
  }

 
}
```
---
```html
<h2>🛒 Product List</h2>

<!-- Product 1 -->
<div
  [class.popular]="products[0].likes > 5"
  [style.borderColor]="products[0].likes > 5 ? 'green' : '#ccc'"
  class="product-box"
>
  <h3>{{ products[0].name }}</h3>
  <p>Price: {{ products[0].price }} EGP</p>
  <p>Likes: {{ products[0].likes }}</p>
  <button (click)="like(0)">👍 Like</button><br /><br />
  <label
    >Change Price:
    <input [(ngModel)]="products[0].price" />
  </label>
</div>

<!-- Product 2 -->
<div
  [class.popular]="products[1].likes > 5"
  [style.borderColor]="products[1].likes > 5 ? 'green' : 'red'"
  class="product-box"
>
  <h3>{{ products[1].name }}</h3>
  <p>Price: {{ products[1].price }} EGP</p>
  <p>Likes: {{ products[1].likes }}</p>
  <button (click)="like(1)">👍 Like</button><br /><br />
  <label
    >Change Price:
    <input [(ngModel)]="products[1].price" />
  </label>
</div>

<!-- Product 3 -->
<div
  [class.popular]="products[2].likes > 5"
  [style.borderColor]="products[2].likes > 5 ? 'green' : 'red'"
  class="product-box"
>
  <h3>{{ products[2].name }}</h3>
  <p>Price: {{ products[2].price }} EGP</p>
  <p>Likes: {{ products[2].likes }}</p>
  <button (click)="like(2)">👍 Like</button><br /><br />
  <label
    >Change Price:
    <input [(ngModel)]="products[2].price" />
  </label>
</div>
```
---
```css
/* product-list.component.css */
.title {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.product-box {
  border: 2px solid #ccc;
  padding: 10px;
  width: 250px;
  margin-bottom: 15px;
  border-radius: 8px;
  background-color: #f9f9f9;
  transition: all 0.3s ease-in-out;
}

.product-box:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.popular {
  border-color: green !important;
  background-color: #e0ffe0;
}
```
---
