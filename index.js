let bookId = 1;
let validForm = false;

const myLibrary = [];
const titleRegx = new RegExp(/^[A-Za-z0-9][A-Za-z0-9\s\-_,\.;:()]*$/);
const authorRegx = new RegExp(/^[A-Za-z][A-Za-z\s]+$/);
const numberRegx = new RegExp(/^[0-9]+$/);


const bookListContainer = document.getElementById('book-list');
const addBookButton = document.getElementById('add-book-btn');
const addBookDialog = document.getElementById('add-book-dialog');
const dialogAddBtn = document.getElementById('dialogAddBtn');
const bookForm = document.getElementById('book-form');
const dialogCloseBtn = document.getElementById('close-btn');
const errMsgDivs = document.querySelectorAll('.err-msg');


bookForm.addEventListener('input', validateInput);
bookForm.addEventListener('change', validateInput);

addBookButton.addEventListener('click', () => {
    addBookDialog.showModal();
});

addBookDialog.addEventListener('close', () => {
    errMsgDivs.forEach((errMsgDiv) => {
        errMsgDiv.textContent = '';
    })
    bookForm.reset();
});


dialogAddBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const bookFormData = new FormData(bookForm);
    const title = bookFormData.get('title');
    const author = bookFormData.get('author');
    const numPages = bookFormData.get('numPages');
    const read = bookFormData.get('read') === null ? false :
    bookFormData.get('read') === 'on' ? true : false;
    if(validForm) {
        let book = new Book(title, author, numPages, read);
        addBookToLibrary(book);
        bookForm.reset();
        addBookDialog.close();
    } else if(title === '' && author === '' && numPages === '') {

        errMsgDivs.forEach((errMsgDiv) => {
            errMsgDiv.textContent = 'This field is required';
        })
    }
});

dialogCloseBtn.addEventListener('click', () => {
    addBookDialog.close();
});

function Book(title, author, numPages, read) {
    this.id = bookId++;
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
        checkboxInput.addEventListener('change', () => {
            myLibrary.forEach((item) => {
                if(book.id === item.id) {
                    item.read = !item.read;
                }
            });
        });
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

function validateInput(event) {
    let inputId = event.target.id;
    let errMsgElement;
    switch(inputId) {
        case 'title':
            const title = event.target.value;
            errMsgElement = document.getElementById('title-err-msg');
            if(!title.match(titleRegx)) {
                if(title.replace(/[\s]+/, '') !== '') {
                    errMsgElement.textContent = "Invalid title";
                } else {
                    errMsgElement.textContent = "This field is required";
                }
                validForm = false;
            } else {
                errMsgElement.textContent = "";
                validForm = true;
            }
            break;
        case 'author':
            const author = event.target.value;
            errMsgElement = document.getElementById('author-err-msg');
            if(!author.match(authorRegx)) {
                if(author.replace(/[\s]+/, '') !== '') {
                    errMsgElement.textContent = "Invalid author name";
                } else {
                    errMsgElement.textContent = "This field is required";
                }
                validForm = false;
            } else {
                errMsgElement.textContent = "";
                validForm = true;
            }
            break;
        case 'num-pages':
            const numPages = event.target.value;
            errMsgElement = document.getElementById('pages-err-msg');
            if(!numPages.match(numberRegx)) {
                if(numPages.replace(/[\s]+/, '') !== '') {
                    errMsgElement.textContent = "Invalid number";
                } else {
                    errMsgElement.textContent = "This field is required";
                }
                validForm = false;
            } else {
                errMsgElement.textContent = "";
                validForm = true;
            }
            break;
        default: break;
    }
}
