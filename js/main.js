"use strict";
class Book {
    constructor() {
        this.isbn = "";
        this.title = "";
        this.price = 0;
        this.releaseDate = new Date();
    }
}
let myBook = new Book();
myBook.isbn = "12345";
myBook.title = "Goosebumps";
myBook.price = 9.99;
myBook.releaseDate = new Date(1999, 9, 31);
console.log(myBook);
window.onload = function () {
    let addBookButton = document.querySelector("#addBookButton");
    addBookButton.onclick = processBook;
    function processBook() {
        let userBook = getBook();
        if (userBook != null) {
            addBook(userBook);
        }
    }
};
function getBook() {
    let isbnTextBox = document.querySelector("#isbnFormField");
    let bookTitleFormField = document.querySelector("#bookTitleFormField");
    let retailPriceFormField = document.querySelector("#retailPriceFormField");
    let releaseDateFormField = document.querySelector("#releaseDateFormField");
    let isValidData = true;
    let isbn = isbnTextBox.value;
    if (!isValidISBN13(isbn)) {
        isValidData = false;
        let isbnErrorTextBox = isbnTextBox.nextElementSibling;
        isbnErrorTextBox.textContent = "ISBN must be either 10 or 13 digits";
    }
}
function isValidISBN13(data) {
    let isbnRegex = /^(97[89])?\d{9}(\d|X)$/;
    return isbnRegex.test(data);
}
function addBook(b) {
}
