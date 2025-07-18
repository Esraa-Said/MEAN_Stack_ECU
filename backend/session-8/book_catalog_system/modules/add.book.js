const readBooks = require("./read.books");
const saveBook = require("./save.book");

async function addBook(title, author, year) {
  if (!title || !author || !year) {
    console.log(`❌ Can Not Add, Invalid Book Data.`);
    return;
  }
  try {
    const books = await readBooks();
    let book = { id: books.length + 1, title, author, year };
    books.push(book);

    await saveBook(books);
  } catch (err) {
    console.error(err);
  }
}

module.exports = addBook;
