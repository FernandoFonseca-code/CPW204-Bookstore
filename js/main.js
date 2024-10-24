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
    let isbnFormField = document.querySelector("#isbnFormField");
    let bookTitleFormField = document.querySelector("#bookTitleFormField");
    let retailPriceFormField = document.querySelector("#retailPriceFormField");
    let releaseDateFormField = document.querySelector("#releaseDateFormField");
    let isValidData = true;
    let isbn = isbnFormField.value;
    if (!isValidISBN13(isbn)) {
        isValidData = false;
        let isbnErrorTextBox = isbnFormField.nextElementSibling;
        isbnErrorTextBox.textContent = "ISBN must be either 10 or 13 digits";
    }
    let title = bookTitleFormField.value;
    if (title.trim() == "") {
        isValidData = false;
        let bookTitleErrorTextBox = bookTitleFormField.nextElementSibling;
        bookTitleErrorTextBox.textContent = "Title must be entered; can't be blank";
    }
    let price = parseFloat(retailPriceFormField.value);
    if (isNaN(price) || price < 0) {
        isValidData = false;
        let retailPriceErrorTextBox = retailPriceFormField.nextElementSibling;
        retailPriceErrorTextBox.textContent = "Price must be a positive number";
    }
    let releaseDate = releaseDateFormField.value;
    let releaseDateCheck = Date.parse(releaseDate);
    if (isNaN(releaseDateCheck)) {
        isValidData = false;
        let releaseDateErrorTextBox = releaseDateFormField.nextElementSibling;
        releaseDateErrorTextBox.textContent = "Release date must be a valid date";
    }
}
function isValidISBN13(data) {
    let isbnRegex = /^(97[89])?\d{9}(\d|X)$/;
    return isbnRegex.test(data);
}
function addBook(b) {
}
