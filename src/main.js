import MyLibrary from "./MyLibrary.js"


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
hideForm();  // Hide the add book form initially

addBook("Tolkien", "The Lord of the Rings", 500, false);
addBook("Tolkien", "Hobbit", 310, false);
addBook("Tolkien", "The Silmarillon", 500, false);
addBook("John Smith", "Real book 1", 110, false);
addBook("John Smith", "Real book 2", 210, true);
addBook("John Smith", "Real book 3", 310, false);


function addBook(author, title, pages, isRead) {
    const new_book = myLibrary.addBook(author, title, pages, isRead);
    const card = createCard(new_book);
    cardsContainer.appendChild(card);
}


function submitButtonAction(e) {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const isRead = document.getElementById("read-status").checked;
    addBook(author, title, pages, isRead);
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
    const status = e.target.parentNode.parentNode.querySelector(".read-status");
    status.textContent = readStatus(myLibrary.getBook(e.target.id));
}

function readStatus(book) {
    return book.read === true ? "Completed":"Still reading";
}

function removeBook(e) {
    myLibrary.removeBook(e.target.id);
    e.target.parentNode.parentNode?.remove();

}

function createCard(book) {
    const card = document.createElement("div");
    card.id = `${book.id}`;
    card.className = "book-card";
    
    const authorTag = document.createElement("p")
    authorTag.textContent = `Author`;
    authorTag.classList.add("card-tag");
    card.appendChild(authorTag);

    const author = document.createElement("p")
    author.textContent = `${book.author}`;
    card.appendChild(author);

    const titleTag = document.createElement("p")
    titleTag.textContent = `Title`;
    titleTag.classList.add("card-tag");
    card.appendChild(titleTag);

    const title = document.createElement("p");
    title.textContent = `${book.title}`;
    card.appendChild(title);

    const pagesTag = document.createElement("p")
    pagesTag.textContent = `Pages`;
    pagesTag.classList.add("card-tag");
    card.appendChild(pagesTag);

    const pages = document.createElement("p");
    pages.textContent = `${book.pages}`;
    card.appendChild(pages);

    const readTag = document.createElement("p")
    readTag.textContent = `Reading Status`;
    readTag.classList.add("card-tag");
    card.appendChild(readTag);

    const read = document.createElement("p");
    read.textContent = `${readStatus(book)}`;
    read.classList.add("read-status");
    card.appendChild(read);

    const controls = document.createElement("div");
    controls.className = "card-controls";
    card.appendChild(controls);

    const toggleStatusButton = document.createElement("button");
    toggleStatusButton.innerHTML = "Read";
    toggleStatusButton.id = `${book.id}`;
    toggleStatusButton.addEventListener("click", toggleStatusAction);
    controls.appendChild(toggleStatusButton);

    const removeButton = document.createElement("button");
    removeButton.innerHTML = "X";
    removeButton.id = `${book.id}`;
    removeButton.addEventListener("click", removeBook);
    controls.appendChild(removeButton);

    return card;
}
