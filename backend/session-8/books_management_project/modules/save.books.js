const { writeFile } = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "../data/books.json");

function saveBooks(books) {
  try {
    writeFile(filePath, JSON.stringify(books, null, 2));
  } catch (error) {
    console.log(`Error ${error}`);
  }
}


module.exports = saveBooks;