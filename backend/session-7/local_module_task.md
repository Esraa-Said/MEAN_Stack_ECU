
## ✅ Project 1: Simple Shopping Cart

### 📝 Description

Simulate a cart system that supports:

- Adding products to cart
- Removing products
- Listing items
- Calculating total

### 📁 Files Structure

- `index.js`: Controls the flow of operations.
- `modules/addToCart.js`: Adds a product by ID to the cart.
- `modules/removeFromCart.js`: Removes an item by ID from the cart.
- `modules/listCart.js`: Logs cart items.
- `modules/calculateTotal.js`: Calculates total price.
- `data/products.js`: List of available products.
- `data/cart.js`: Stores cart items.

---

## ✅ Project 2: Student Gradebook

### 📝 Description

Manage students and their grades:

- Add students with grades
- Calculate their average
- List students
- Show who passed

### 📁 Files Structure

- `index.js`: Main control file with calls to add/list/evaluate.
- `modules/addStudent.js`: Adds a student with an array of grades.
- `modules/calculateAverage.js`: Calculates average of grades.
- `modules/filterPassed.js`: Filters students with average >= 60.
- `modules/listStudents.js`: Lists all students.
- `data/students.js`: Holds student records.

---

## ✅ Project 3: Simple Phonebook

### 📝 Description

Simple phonebook system:

- Add a contact
- Delete contact
- Search contacts by name
- List all contacts

### 📁 Files Structure

- `index.js`: Controls calling the phonebook features.
- `modules/addContact.js`: Adds a contact.
- `modules/removeContact.js`: Removes contact by ID.
- `modules/searchContact.js`: Logs matched contacts by name.
- `modules/listContacts.js`: Logs all contacts.
- `data/contacts.js`: Contains contact entries.

---

## ✅ Project 4: Library Book Manager

### 📝 Description

Manage a small library system:

- Add books
- Remove books
- List all books
- Search books by author

### 📁 Files Structure

- `index.js`: Manually calls functions to manage books.
- `modules/addBook.js`: Adds a new book object.
- `modules/removeBook.js`: Removes a book by ID.
- `modules/listBooks.js`: Lists all available books.
- `modules/searchBooks.js`: Searches by author name.
- `data/books.js`: Stores a list of books.

### 🧪 Example Book Object

```js
{ id: 1, title: "Clean Code", author: "Robert C. Martin" }
```

---

## ✅ Project 5: Inventory Management

### 📝 Description

Manage stock items in a warehouse:

- Add items
- Delete items
- List current inventory
- Check low stock (less than 5 units)

### 📁 Files Structure

- `index.js`: Controls inventory actions by calling local modules.
- `modules/addItem.js`: Adds a stock item.
- `modules/deleteItem.js`: Deletes an item by ID.
- `modules/listInventory.js`: Lists all stock items.
- `modules/checkLowStock.js`: Lists items with stock < 5.
- `data/inventory.js`: Contains the array of inventory items.

### 🧪 Example Inventory Item

```js
{ id: 101, name: "Mouse", quantity: 3 }
```

