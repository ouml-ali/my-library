const myLibrary = [];

const bookListContainer = document.getElementById('book-list');
const addBookButton = document.getElementById('add-book-btn');
const addBookDialog = document.getElementById('add-book-dialog');
const dialogAddBtn = document.getElementById('dialogAddBtn');
const bookForm = document.getElementById('book-form');

addBookButton.addEventListener('click', () => {
    addBookDialog.showModal();
});

// addBookDialog.addEventListener('close', () => {

// });

dialogAddBtn.addEventListener('click', (event) => {
    event.preventDefault();
    //TODO do input validation while inputing in form not just at the end
    let titleRegx = new RegExp(/^[A-Za-z0-9\s\-_,\.;:()]+$/);
    let authorRegx = new RegExp(/^[A-Za-z\s]+$/);
    let numberRegx = new RegExp(/^[0-9]+$/);
    let formData = new FormData(bookForm);
    let title = '';
    let author = '';
    let numPages = 0;
    let read = false;
    for(let [name, value] of formData) {
        switch (name) {
            case 'title':
                if(value.match(titleRegx)) title = value;
                break;
            case 'author':
                if(value.match(authorRegx)) author = value;
                break;
            case 'numPages':
                if(value.match(numberRegx)) numPages = value;
                break;
            case 'read':
                if(value === 'on') read = true;
            break;
            default:
                break;
        }
    }
    if(title !== '' && author !== '' && numPages !== '') {
        let book = new Book(title, author, numPages, read);
        addBookToLibrary(book);
        addBookDialog.close();
    } else {
        //TODO show some message in dialog or something

    }


});

function Book(title, author, numPages, read) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
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