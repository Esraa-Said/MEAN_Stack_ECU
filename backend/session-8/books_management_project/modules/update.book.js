const readBooks = require("./read.books");
const saveBooks = require("./save.books");

async function updateBook(id, title) {
  const books = await readBooks();

  let book = books.find((book) => {
    return book.id === id;
  });

  if (!title) {
    console.log("Title is Missing");
    return;
  }
  book.title = title;
  saveBooks(books);
}

module.exports = updateBook;