function readStatus(book) {
  return book.read === true ? 'Completed' : 'Still reading';
}

function toggleStatusAction(e, myLibrary) {
  myLibrary.toggleBookStatus(e.target.id);
  const status = e.target.parentNode.parentNode.querySelector('.read-status');
  status.textContent = readStatus(myLibrary.getBook(e.target.id));
}

function removeBook(e, myLibrary) {
  myLibrary.removeBook(e.target.id);
  e.target.parentNode.parentNode?.remove();
}

export default function createCard(book, myLibrary) {
  const card = document.createElement('div');
  card.id = `${book.id}`;
  card.className = 'book-card';

  const authorTag = document.createElement('p');
  authorTag.textContent = 'Author';
  authorTag.classList.add('card-tag');
  card.appendChild(authorTag);

  const author = document.createElement('p');
  author.textContent = `${book.author}`;
  card.appendChild(author);

  const titleTag = document.createElement('p');
  titleTag.textContent = 'Title';
  titleTag.classList.add('card-tag');
  card.appendChild(titleTag);

  const title = document.createElement('p');
  title.textContent = `${book.title}`;
  card.appendChild(title);

  const pagesTag = document.createElement('p');
  pagesTag.textContent = 'Pages';
  pagesTag.classList.add('card-tag');
  card.appendChild(pagesTag);

  const pages = document.createElement('p');
  pages.textContent = `${book.pages}`;
  card.appendChild(pages);

  const readTag = document.createElement('p');
  readTag.textContent = 'Reading Status';
  readTag.classList.add('card-tag');
  card.appendChild(readTag);

  const read = document.createElement('p');
  read.textContent = `${readStatus(book)}`;
  read.classList.add('read-status');
  card.appendChild(read);

  const controls = document.createElement('div');
  controls.className = 'card-controls';
  card.appendChild(controls);

  const toggleStatusButton = document.createElement('button');
  toggleStatusButton.innerHTML = 'Read';
  toggleStatusButton.id = `${book.id}`;
  toggleStatusButton.addEventListener('click', (e) => { toggleStatusAction(e, myLibrary); });
  controls.appendChild(toggleStatusButton);

  const removeButton = document.createElement('button');
  removeButton.innerHTML = 'X';
  removeButton.id = `${book.id}`;
  removeButton.addEventListener('click', (e) => { removeBook(e, myLibrary); });
  controls.appendChild(removeButton);

  return card;
}
