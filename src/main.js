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

    const controls = document.createElement("div");
    controls.className = "card-controls";
    card.appendChild(control);

    const removeButton = document.createElement("button");
    removeButton.innerHTML = "X";
    removeButton.id = `${book.id}`;
    removeButton.addEventListener("click", removeBook);
    controls.appendChild(removeButton);

    const toggleStatusButton = document.createElement("button");
    toggleStatusButton.innerHTML = "Read";
    toggleStatusButton.id = `${book.id}`;
    toggleStatusButton.addEventListener("click", toggleStatusAction);
    controls.appendChild(toggleStatusButton);

    return card;
}
