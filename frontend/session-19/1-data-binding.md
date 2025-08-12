# Data Binding

Data binding in Angular is a core concept that defines how communication occurs between the component (logic) and the DOM (view).
It allows developers to dynamically display and update data in the template without manually manipulating the DOM.

- **Communication Between Component and Template**

---

## Types Of Data Binding

1. **One Way Data Binding**
2. **Two Way Data Binding**

---

### **One Way Data Binding**

- **Communication in one direction**: from component to template or vice versa.

#### Component to Template

1. **String Interpolation**
   _Embedding data from the component into the HTML template._
   This is used to display a component's property inside the view using double curly braces `{{ }}`.

   ```html
   <h1>{{ title }}</h1>
   ```

   ```ts
   // Component Code
   export class AppComponent {
     title = "Welcome to Angular!";
   }
   ```

2. **Property Binding**
   _Binding an element's property to a component property._
   You use square brackets `[]` to bind to a DOM property.

   ```html
   <img [src]="imageUrl" alt="Angular Logo" />
   ```

   ```ts
   // Component Code
   export class AppComponent {
     imageUrl = "assets/angular-logo.png";
   }
   ```

3. **Class Binding**
   _Class binding lets you add or remove CSS classes dynamically based on conditions._

   ```html
   <p [class.success]="isSuccess">Operation Successful</p>
   <div [ngClass]="{ active: isActive, disabled: !isActive }">Status</div>
   <span [class.warning]="showWarning">Warning Text</span>
   ```

   ```ts
   export class AppComponent {
     isSuccess = true;
     isActive = true;
     showWarning = true;
   }
   ```

   ```css
   .success { color: green; }
   .active { font-weight: bold; }
   .disabled { opacity: 0.5; }
   .warning { color: orange; }
   ```

4. **Style Binding**
   _Style binding allows you to set inline styles dynamically on elements._

   ```html
   <p [style.color]="textColor">Styled Text</p>
   <div [ngStyle]="{ 'font-size.px': fontSize, background: backgroundColor }">Dynamic Style</div>
   <span [style.border]="borderStyle">Bordered</span>
   ```

   ```ts
   export class AppComponent {
     textColor = 'blue';
     fontSize = 18;
     backgroundColor = '#f0f0f0';
     borderStyle = '1px solid black';
   }
   ```

#### Template to Component

1. **Event Binding**
   _Passing data or triggering logic from the template to the component via events._

   ```html
   <button (click)="onClick()">Click Me</button>
   ```

   ```ts
   // Component Code
   export class AppComponent {
     onClick() {
       console.log("Button clicked!");
     }
   }
   ```

---

### **Two Way Data Binding**

- **Bi-directional communication**: from the component to the template and vice versa.
- Achieved using `[(ngModel)]` in Angular forms.

This creates a synchronized state between the component class and the input field in the template.

```html
<input [(ngModel)]="name" placeholder="Enter your name" />
<p>Hello, {{ name }}!</p>
```

```ts
// Component Code
export class AppComponent {
  name = "";
}
```

---

> 📝 Note: To use `[(ngModel)]`, you need to import `FormsModule` in your standalone component or module.
