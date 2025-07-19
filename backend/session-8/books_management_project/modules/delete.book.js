const readBooks = require("./read.books");
const saveBooks = require("./save.books");

async function deleteBook(id) {
  const books = await readBooks();
  let index = books.findIndex((book) => {
    return book.id === id;
  });
  if(index === -1){
    console.log("Invalid id Book not Found");
    return;
  }
  books.splice(index, 1);
  saveBooks(books);
  console.log("Book deleted")
}
module.exports = deleteBook;

