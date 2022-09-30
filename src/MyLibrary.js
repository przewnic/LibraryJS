import Book from './Book.js';

export default class MyLibrary {
  constructor() {
    this.books = [];
    this.idCount = 0;
  }

  getBook(id) {
    return this.books.find((element) => element.id.toString() === id);
  }

  addBook(author, title, pages, read = false) {
    const newId = this.getNewId();
    const NewBook = new Book(newId, author, title, pages, read);
    this.books.push(NewBook);
    return NewBook;
  }

  removeBook(removeId) {
    this.books = this.books.filter((book) => book.id !== removeId);
  }

  toggleBookStatus(bookId) {
    const book = this.books.find((element) => element.id.toString() === bookId);
    book.toggleStatus();
  }

  getNewId() {
    this.idCount += 1;
    return this.idCount;
  }

  sortBooks() {
    // TODO --- sorting books in the list, display by title
  }
}
