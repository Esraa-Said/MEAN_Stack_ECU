const readBooks = require("./read.books");
const saveBook = require("./save.book");

async function deleteBook(id) {
  let books = await readBooks();
  let index = books.findIndex((book) => book.id == id);
  if (index === -1) {
    console.log("❌ Book Not Found");
    return;
  }

  books.splice(index, 1);
  await saveBook(books);
}

module.exports = deleteBook;
