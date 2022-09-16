import Book from "./Book.js"


export default class MyLibrary {
    static id_count = 0;

    constructor() {
        this.books = [];
    }

    getBook(id) {
        return this.books.find(element => element.id.toString() === id);
    }
    
    addBook(author, title, pages, read=false) {
        const new_id = this._get_new_id();
        const new_book = new Book(new_id, author, title, pages, read)
        this.books.push(new_book);
        return new_book;
    }

    removeBook(remove_id) {
        this.books = this.books.filter(book => book.id !== remove_id)
    }

    toggleBookStatus(book_id) {
        const book = this.books.find(element => element.id.toString()===book_id);
        book.toggleStatus();
    }

    _get_new_id() {
        MyLibrary.id_count += 1;
        return MyLibrary.id_count;
    }

    sortBooks() {
        // TODO --- sorting books in the list, display by title
    }

}
