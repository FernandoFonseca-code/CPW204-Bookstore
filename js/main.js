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
        addBookToWebPage(userBook);
        addBookToStorage(userBook);
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
    let releaseDate = new Date(releaseDateFormField.value + 'T08:00:00Z');
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
function addBookToWebPage(b) {
    console.log(b);
    let bookDiv = document.createElement("div");
    let titleHeading = document.createElement("h2");
    titleHeading.textContent = `${b.title} : ${b.isbn}`;
    let bookDescription = document.createElement("p");
    bookDescription.textContent = `This book will be released on ${b.releaseDate.toDateString()}
    and will cost $${b.price.toFixed(2)}`;
    bookDiv.appendChild(titleHeading);
    bookDiv.appendChild(bookDescription);
    let BookListDisplay = document.querySelector("#book-display");
    BookListDisplay.appendChild(bookDiv);
}
function addBookToStorage(b) {
    const BookStorageKey = "Books";
    let bookData = localStorage.getItem(BookStorageKey);
    if (bookData == null) {
        let books = [];
        books.push(b);
        bookData = JSON.stringify(books);
        localStorage.setItem(BookStorageKey, bookData);
    }
    else {
    }
}
function clearAllErrorMessages() {
    let allErrorMessages = document.querySelectorAll(".error-msg");
    for (let i = 0; i < allErrorMessages.length; i++) {
        let currentElement = allErrorMessages[i];
        currentElement.textContent = "";
    }
}
