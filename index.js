const myLibrary = [];

const bookListContainer = document.getElementById('book-list');
const addBookButton = document.getElementById('add-book-btn');

addBookButton.addEventListener('click', () => {
    addBookToLibrary();
});

function Book(title, author, numPages) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = false;
}

function addBookToLibrary() {
    let sampleBook = new Book("Sample Book", "Ali O.", 25);
    myLibrary.push(sampleBook);
    updateBookListUI();
}

function updateBookListUI() {
    bookListContainer.textContent = '';
    for(let book of myLibrary) {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');

        const bookImage = document.createElement('div');
        bookImage.classList.add('book-image');


        const bookInfo = document.createElement('div');
        bookInfo.classList.add('book-info');

        const titleElement = document.createElement('h4');
        titleElement.textContent = book.title;

        const authorElement = document.createElement('p');
        authorElement.textContent = book.author;

        const numPagesElement = document.createElement('p');
        numPagesElement.textContent = book.numPages + ' pages';


        const readCheckBoxContainer = document.createElement('div');
        readCheckBoxContainer.classList.add('read-check');

        const checkboxInput = document.createElement('input');
        checkboxInput.setAttribute('type', 'checkbox');
        checkboxInput.setAttribute('id', 'read-checkbox');
        checkboxInput.setAttribute('name', 'read');
        checkboxInput.checked = book.read;



        const checkboxLabel = document.createElement('label');
        checkboxLabel.textContent = ' Read';
        checkboxLabel.setAttribute('for', 'read-checkbox');


        readCheckBoxContainer.appendChild(checkboxInput);
        readCheckBoxContainer.appendChild(checkboxLabel);


        bookInfo.appendChild(titleElement);
        bookInfo.appendChild(authorElement);
        bookInfo.appendChild(numPagesElement);
        bookInfo.appendChild(readCheckBoxContainer);

        bookItem.appendChild(bookImage);
        bookItem.appendChild(bookInfo);


        bookListContainer.appendChild(bookItem);
    }
}