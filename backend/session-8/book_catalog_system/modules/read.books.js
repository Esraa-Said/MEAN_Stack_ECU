const { readFile } = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "../data/books.json");

async function readBooks() {
  try {
    const response = await readFile(filePath, "utf8");
    const books =  JSON.parse(response);
    return books;
  } catch (err) {
    console.error(err);
  }
}

module.exports = readBooks;