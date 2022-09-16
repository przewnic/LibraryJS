export default class Book {
    constructor(id, author, title, pages, read=false) {
        this.id = id,
        this.author = author,
        this.title = title,
        this.pages = pages,
        this.read = read
    }

    toggleStatus() {
        this.read = this.read ? false : true;
    }
}
