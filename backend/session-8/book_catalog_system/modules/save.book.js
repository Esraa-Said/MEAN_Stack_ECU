
const path = require("path");
const { writeFile } = require("fs").promises;

const filePath = path.join(__dirname, "../data/books.json");

async function saveBook(books) {
  try {
    await writeFile(filePath, JSON.stringify(books, null, 2));
  } catch (err) {
    console.error(err);
  }
}

module.exports = saveBook;
