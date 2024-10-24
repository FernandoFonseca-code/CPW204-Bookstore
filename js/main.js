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
