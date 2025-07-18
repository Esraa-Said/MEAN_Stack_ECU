const addBook = require("./modules/add.book");
const readBooks = require("./modules/read.books");
const deleteBook = require("./modules/delete.book");
const updateBook = require("./modules/update.book");

async function main() {
  console.log(await readBooks());

  await addBook("book title", "Ali", 2025);
  console.log(await readBooks());

  await deleteBook(5);
  console.log(await readBooks());

  await updateBook(4, "updated title");
  console.log(await readBooks());
}

main();
