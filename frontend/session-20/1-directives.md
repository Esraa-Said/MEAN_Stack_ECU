# Directives
A **Directive** is a class in Angular that allows you to attach custom behavior or modify the appearance/structure of DOM elements.

* **Manipulate DOM**
* **Change Behavior**
* **Add/Remove DOM Elements**

## Types Of Directives
1. **Components Directive**
2. **Attribute Directive**
3. **Structural Directive**
4. **Custom Directive**
---

### 1. Components Directive
* A **Directive with a Template.**  
* Every Angular component is technically a directive with its own template.  
    ```typescript
    @Component({
    selector: 'app-example',
    template: `<h1>Hello, Angular!</h1>`
    })
    export class ExampleComponent {}
    ```


### 2. Attribute Directive
* Used to change the **Appearance** or **Behavior** of a DOM element.
* Not Template.
* Not Remove or Add Elements.
* `ngStyle`: Dynamically applies styles.
    ```html
    <p [ngStyle]="{ 'color': 'blue', 'font-size': '20px' }">Styled Text</p>
    ```
* `ngClass`: Dynamically applies CSS classes.
    ```html
    <div [ngClass]="{ 'highlight': isHighlighted }">Class Example</div>
    ```
    ```typescript
    export class AppComponent {
    isHighlighted = true;
    }
    ```

### 3. Structural Directive
* Used To **Add** and **Remove** DOM Elements.
* `ngIf`
* `ngFor`
* `ngSwitch`

### 4. Custom Directive
* Create a custom directive by using the `@Directive` decorator.
* Used to define custom behaviors for DOM elements.