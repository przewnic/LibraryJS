import MyLibrary from './MyLibrary.js';
import createCard from './Card.js';

const myLibrary = new MyLibrary();
const cardsContainer = document.getElementById('cards-container');
const formContainer = document.getElementById('form-container');
const addForm = document.getElementById('add-form');
const submitButton = document.getElementById('submit-bttn');
const addButton = document.getElementById('add-bttn');
const cancelButton = document.getElementById('cancel-bttn');

function addBook(author, title, pages, isRead) {
  const newBook = myLibrary.addBook(author, title, pages, isRead);
  const card = createCard(newBook, myLibrary);
  cardsContainer.appendChild(card);
}

function hideForm() {
  formContainer.style.visibility = 'hidden';
}

function submitButtonAction(e) {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const isRead = document.getElementById('read-status').checked;
  addBook(author, title, pages, isRead);
  hideForm(e);
}

function displayFormAction() {
  addForm.reset();
  formContainer.style.visibility = 'visible';
}

submitButton.addEventListener('click', submitButtonAction);
addButton.addEventListener('click', displayFormAction);
cancelButton.addEventListener('click', hideForm);
hideForm(); // Hide the add book form initially

addBook('Tolkien', 'The Lord of the Rings', 500, false);
addBook('Tolkien', 'Hobbit', 310, false);
addBook('Tolkien', 'The Silmarillon', 500, false);
addBook('John Smith', 'Real book 1', 110, false);
addBook('John Smith', 'Real book 2', 210, true);
addBook('John Smith', 'Real book 3', 310, false);
