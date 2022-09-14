class MyLibrary {
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


class Book {
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



const myLibrary = new MyLibrary();
const cardsContainer = document.getElementById("cards-container");
const formContainer = document.getElementById("form-container");
const addForm = document.getElementById("add-form");
const submitButton = document.getElementById("submit-bttn")
const addButton = document.getElementById("add-bttn");
const cancelButton = document.getElementById("cancel-bttn");

submitButton.addEventListener("click", submitButtonAction);
addButton.addEventListener("click", displayFormAction);
cancelButton.addEventListener("click", hideForm);


function addBook() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const isRead = document.getElementById("read-status").checked;

    const new_book = myLibrary.addBook(author, title, pages, isRead);
    const card = createCard(new_book);
    cardsContainer.appendChild(card);
}


function submitButtonAction(e) {
    addBook();
    hideForm(e);
}


function displayFormAction() {
    addForm.reset();
    formContainer.style.visibility = "visible";
}


function hideForm() {
    formContainer.style.visibility = "hidden";
}


function toggleStatusAction(e) {
    myLibrary.toggleBookStatus(e.target.id);
    const status = e.target.parentNode.querySelector(".read-status");
    status.textContent = myLibrary.getBook(e.target.id).read;

}

function removeBook(e) {
    myLibrary.removeBook(e.target.id);
    e.target.parentNode?.remove();

}

function createCard(book) {
    const card = document.createElement("div");
    card.id = `${book.id}`;
    card.className = "book-card";
    
    const author = document.createElement("p")
    author.textContent = `${book.author}`;
    card.appendChild(author);

    const title = document.createElement("p");
    title.textContent = `${book.title}`;
    card.appendChild(title);

    const pages = document.createElement("p");
    pages.textContent = `${book.pages}`;
    card.appendChild(pages);

    const read = document.createElement("p");
    read.textContent = `Read: ${book.read}`;
    read.classList.add("read-status");
    card.appendChild(read);

    const removeButton = document.createElement("button");
    removeButton.innerHTML = "X";
    removeButton.id = `${book.id}`;
    removeButton.addEventListener("click", removeBook);
    card.appendChild(removeButton);

    const toggleStatusButton = document.createElement("button");
    toggleStatusButton.innerHTML = "Read";
    toggleStatusButton.id = `${book.id}`;
    toggleStatusButton.addEventListener("click", toggleStatusAction);
    card.appendChild(toggleStatusButton);

    return card;
}