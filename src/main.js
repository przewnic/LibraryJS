import MyLibrary from './MyLibrary.js';
import createCard from './Card.js';

const myLibrary = new MyLibrary();
const cardsContainer = document.getElementById('cards-container');
const formContainer = document.getElementById('form-container');
const addForm = document.getElementById('add-form');
const submitButton = document.getElementById('submit-bttn');
const addButton = document.getElementById('add-bttn');
const cancelButton = document.getElementById('cancel-bttn');

// Form validity
const title = document.getElementById('title');
const titleError = document.querySelector('#title + span.error');
const author = document.getElementById('author');
const authorError = document.querySelector('#author + span.error');
const pages = document.getElementById('pages');
const pagesError = document.querySelector('#pages + span.error');

function addBook(authorValue, titleValue, pagesValue, isReadValue) {
  const newBook = myLibrary.addBook(authorValue, titleValue, pagesValue, isReadValue);
  const card = createCard(newBook, myLibrary);
  cardsContainer.appendChild(card);
}

// Clear form errors
function clearInputErrors(inputError) {
  inputError.textContent = '';
  inputError.className = 'error';
}

function clearForm() {
  clearInputErrors(titleError);
  clearInputErrors(authorError);
  clearInputErrors(pagesError);
  addForm.reset();
  title.className = 'init';
  author.className = 'init';
  pages.className = 'init';
}

function hideForm() {
  formContainer.style.visibility = 'hidden';
  clearForm();
}

function submitButtonAction(e) {
  const titleValue = document.getElementById('title').value;
  const authorValue = document.getElementById('author').value;
  const pagesValue = document.getElementById('pages').value;
  const isReadValue = document.getElementById('read-status').checked;
  addBook(authorValue, titleValue, pagesValue, isReadValue);
  hideForm(e);
}

function displayFormAction() {
  addForm.reset();
  formContainer.style.visibility = 'visible';
}

submitButton.addEventListener('click', (event) => { if (addForm.checkValidity()) { submitButtonAction(); } });
addButton.addEventListener('click', displayFormAction);
cancelButton.addEventListener('click', hideForm);
hideForm(); // Hide the add book form initially

// Handling form errors
title.addEventListener('input', (event) => {
  if (title.validity.valid) {
    clearInputErrors(titleError);
  } else if (title.validity.valueMissing) {
    titleError.textContent = 'You need to enter a book title.';
    titleError.className = 'error active';
  } else if (title.validity.tooShort) {
    titleError.textContent = 'Min length = 2.';
    titleError.className = 'error active';
  }
  title.className = '';
});

author.addEventListener('input', (event) => {
  if (author.validity.valid) {
    clearInputErrors(authorError);
  } else if (author.validity.valueMissing) {
    authorError.textContent = 'You need to enter an author.';
    authorError.className = 'error active';
  } else if (author.validity.tooShort) {
    authorError.textContent = 'Min length = 5.';
    authorError.className = 'error active';
  }
  author.className = '';
});

pages.addEventListener('input', (event) => {
  if (pages.validity.valid) {
    clearInputErrors(pagesError);
  } else if (pages.validity.valueMissing) {
    pagesError.textContent = 'You need to enter book\'s number of pages.';
    pagesError.className = 'error active';
  }
  pages.className = '';
});

addBook('Tolkien', 'The Lord of the Rings', 500, false);
addBook('Tolkien', 'Hobbit', 310, false);
addBook('Tolkien', 'The Silmarillon', 500, false);
addBook('John Smith', 'Real book 1', 110, false);
addBook('John Smith', 'Real book 2', 210, true);
addBook('John Smith', 'Real book 3', 310, false);
