/**
 * This is a class that represents an individual book that can be purchased
 * Typically TS classes don't have to be initialized but in strict mode they do
 * (aka: set 'default' values in the class or
 * Create a constructor:
 * class Book {
    isbn: string;
    title: string;
    price: number;
    releaseDate: Date;

    constructor(isbn: string, title: string, price: number, releaseDate: Date) {
        this.isbn = isbn;
        this.title = title;
        this.price = price;
        this.releaseDate = releaseDate;
    }
 */
class Book 
{
    /** 
     * The 13 digit ISBN number
     */
    isbn: string = "";

    /**
     * The title of the book
     */
    title: string = "";

    /**
     * The book retail price
     */
    price: number = 0;

    /**
     * Date the book was first published.
     * This could be in the future date, if the book is not released.
     */
    releaseDate: Date = new Date();
}
// Book object test code
let myBook = new Book();
myBook.isbn = "12345";
myBook.title = "Goosebumps";
myBook.price = 9.99;
myBook.releaseDate = new Date(1999, 9, 31); // Months start at index 0; January == 0 && December == 11

console.log(myBook);