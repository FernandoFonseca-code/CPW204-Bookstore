"use strict";
class Book {
    constructor() {
        this.isbn = "";
        this.title = "";
        this.price = 0;
        this.releaseDate = new Date();
    }
}
window.onload = function () {
    let addBookButton = document.querySelector("#addBookButton");
    addBookButton.onclick = processBook;
};
function processBook() {
    let userBook = getBook();
    if (userBook != null) {
        addBook(userBook);
    }
}
function getBook() {
    clearAllErrorMessages();
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
    let releaseDate = new Date(releaseDateFormField.value + 'T07:00:00Z');
    if (isNaN(releaseDate.getTime())) {
        isValidData = false;
        let releaseDateErrorTextBox = releaseDateFormField.nextElementSibling;
        releaseDateErrorTextBox.textContent = "Release date must be a valid date";
    }
    if (isValidData) {
        let addedBook = new Book();
        addedBook.isbn = isbn;
        addedBook.title = title;
        addedBook.price = price;
        addedBook.releaseDate = new Date(releaseDate);
        return addedBook;
    }
    return null;
}
function isValidISBN13(data) {
    let isbnRegex = /^(?:\d{10}|\d{13})$/;
    return isbnRegex.test(data);
}
function addBook(b) {
    console.log(b);
}
function clearAllErrorMessages() {
    let allErrorMessages = document.querySelectorAll(".error-msg");
    for (let i = 0; i < allErrorMessages.length; i++) {
        let currentElement = allErrorMessages[i];
        currentElement.textContent = "";
    }
}
