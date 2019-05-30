var gBooks;
var gNextId;

function createBooks() {
    gNextId = loadFromStorage('nextId');
    gBooks = loadFromStorage('books');
    if (!gBooks) {
        gBooks = [];
        gNextId = 0;
        return;
    }
    gNextId = gBooks[0].id;
    saveBooks()
    savegNextId();
}

function saveBooks() {
    saveToStorage('books', gBooks)
}

function savegNextId() {
    saveToStorage('nextId', gNextId)
}

function createBook(title, price, imgUrlAdress) {
    return {
        id: ++gNextId,
        name: title,
        price: price,
        imgUrl: imgUrlAdress,
        rate: 0
    }
}

function deleteBook(bookId) {
    var idx = gBooks.findIndex(function(book) {
        return book.id === bookId;
    })
    gBooks.splice(idx, 1);
    saveBooks()
}

function findBook(bookId) {
    var foundBook = gBooks.find(function(book) {
        return book.id === bookId;
    })

    return foundBook
}

function updateBookPrice(bookId) {
    var foundBook = findBook(bookId)
    foundBook.price = $(`input[name*='price']`).val()
}

function addBook() {
    gBooks.unshift(createBook($(`input[name*='titleInput']`).val(), $(`input[name*='priceInput']`).val(), $(`input[name*='imgUrl']`).val()));
    saveBooks();
}

function rateChange(rateValue, bookId) {
    var foundBook = findBook(bookId)
    foundBook.rate = $(`.rate-book-value`).text()
    foundBook.rate = parseInt(foundBook.rate);
    if (rateValue < 0 && foundBook.rate === 0 || rateValue === 1 && foundBook.rate === 10) {
        return;
    }
    foundBook.rate += rateValue
    $(`.rate-book-value`).text(foundBook.rate)
    saveBooks();
}