$(document).ready(onInit);

function onInit() {
    createBooks()
    renderTable()
}


function renderTable() {
    var strHtml = '';
    var $Table = $('.table');
    strHtml = `<thead>
                    <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Image</th>
                                            <th scope="col">Actions</th>
                    </tr>
            </thead>
             <tbody>`
    gBooks.forEach(book => {
        strHtml += `<tr><th scope="row" class="book" > ${book.id} </th>
                                        <td class="book"> ${book.name } </td> 
                                        <td class="book"> $${book.price }</td> 
                                        <td> <img src="${book.imgUrl}" alt="${book.name}"/> </td> 
                                        <td> <button class="btn btn-info btn-md" onclick="onReadBook(${book.id})">Read</button> </td>
                                        <td> <button class="btn btn-warning btn-md" onclick="onUpdateModal(${book.id})">Update</button> </td>
                                        <td> <button class="btn btn-danger btn-md" onclick="onDeleteBook(${book.id})">Delete</button> </td>
                   </tr>`
    });
    strHtml += `</tbody>`;
    $Table.html(strHtml);
}



function onUpdateModal(bookId) {
    var foundBook = findBook(bookId)
    $('.modal-content').html(`<div class="modal-header">
                                <h5 class="modal-title">Price Update</h5>
                            </div>
                            <div class="modal-body input-price">
                                <input type="number" name="price" min=0 value="${foundBook.price}">
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="onCloseModal()">Close</button>
                                <button type="button" class="btn btn-primary" onclick="updateModal(${bookId})">Update</button>
                            </div>`);
    $('.modal').show()
}
//code

function updateModal(bookId) {
    updateBookPrice(bookId)
    renderTable()
    onCloseModal()
}

function onDeleteBook(bookId) {
    deleteBook(bookId)
    renderTable()
}


function onCloseModal() {
    $('.modal').hide()
}


function onReadBook(bookId) {
    var foundBook = findBook(bookId)
    $('.modal-content').html(`<div class="modal-header">
                                <h1 class="modal-title"> ${foundBook.name}</h1>
                              </div>
                              <div class="modal-body">
                              <div>
                                <img class="img-fluid" src="${foundBook.imgUrl}"/>
                                <p class="text-muted">${foundBook.name}</p>
                                <p class="text-secondary">$${foundBook.price}</p>
                                <div class="rate-book">Rate Book
                                <span class="rate-book-change" onclick="onRate(-1 ,${bookId})">-</span><span class="rate-book-value" min=0">${foundBook.rate}</span><span class="rate-book-change" onclick="onRate(1 , ${bookId})">+</span>
                                </div>
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="onCloseModal()">Close ${foundBook.name}</button>
                             </div>`);
    $('.modal').show();
}

function onModalAddBook() {
    $('.add-book').toggle();
    $('.table').toggle();
}

function onAddBook() {
    addBook();
    renderTable();
    $('.add-book').hide();
    $('.table').show();
}

function onRate(rateValue, bookId) {
    rateChange(rateValue, bookId)
    renderTable()
}