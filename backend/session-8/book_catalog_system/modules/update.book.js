const readBooks = require("./read.books");
const saveBook = require("./save.book");

async function updateBook(id, title) {
  let books = await readBooks();
  let book = books.find((book) => book.id == id);
  if (!book) {
    console.log("❌ Book Not Found");
    return;
  }
  if (!title) {
    console.log("❌ Title is Missing");
    return;
  }
  book.title = title;
  await saveBook(books);
}

module.exports = updateBook;
