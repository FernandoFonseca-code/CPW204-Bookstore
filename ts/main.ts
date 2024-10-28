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
// Months start at index 0; January == 0 && December == 11
myBook.releaseDate = new Date(1999, 9, 31); 

console.log(myBook);

window.onload = function() 
{// the querySelector function requires a CSS id tag
    let addBookButton = document.querySelector("#addBookButton") as HTMLButtonElement;
    addBookButton.onclick = processBook;
     

    function processBook() 
    {
        let userBook = getBook();
        if (userBook != null){
            addBook(userBook);
        }
        //
    }
}
/**
 * This function will retrieve all the book data from the HTML page. If all data 
 * is valid a Book object will be returned. If any data is invalid, null will 
 * be returned and error messages will be displayed 
 */
function getBook():Book
{
    clearAllErrorMessages();
    // get all inputs
    let isbnFormField = document.querySelector("#isbnFormField") as HTMLInputElement;
    let bookTitleFormField = document.querySelector("#bookTitleFormField") as HTMLInputElement;
    let retailPriceFormField = document.querySelector("#retailPriceFormField") as HTMLInputElement;
    let releaseDateFormField = document.querySelector("#releaseDateFormField") as HTMLInputElement;

    // Validate data
    let isValidData: boolean = true;

    // Validate the ISBN
    let isbn: string = isbnFormField.value;
    if (!isValidISBN13(isbn))
    {
        isValidData = false;
        let isbnErrorTextBox = isbnFormField.nextElementSibling as HTMLElement;
        isbnErrorTextBox.textContent = "ISBN must be either 10 or 13 digits";
    }

    // Validate title
    let title: string = bookTitleFormField.value;
    if (title.trim() == "")
    {
        isValidData = false;
        let bookTitleErrorTextBox = bookTitleFormField.nextElementSibling as HTMLElement;
        bookTitleErrorTextBox.textContent = "Title must be entered; can't be blank";
    }

    // Validate Price
    let price:number = parseFloat(retailPriceFormField.value);
    if (isNaN(price) || price < 0)
    {
        isValidData = false;
        let retailPriceErrorTextBox = retailPriceFormField.nextElementSibling as HTMLElement;
        retailPriceErrorTextBox.textContent = "Price must be a positive number"
    }

    // Validate Release Date
    let releaseDate:string = releaseDateFormField.value;
    let releaseDateCheck = Date.parse(releaseDate);
    if (isNaN(releaseDateCheck))
    {
        isValidData = false;
        let releaseDateErrorTextBox = releaseDateFormField.nextElementSibling as HTMLElement;
        releaseDateErrorTextBox.textContent = "Release date must be a valid date"
    }
        
}

/**
 * This validates an ISBN 13 number
 * @param data The string to be validated
 * @returns True if data is a valid ISBN 13
 */
function isValidISBN13(data: string) 
{
    let isbnRegex = /^(97[89])?\d{9}(\d|X)$/;
    // Check if the ISBN matches the regex
        return isbnRegex.test(data);
}

// function isValidBookTitle(data: string)
// {
//     let 
//     return 
// }
/**
 * Adds a Book object to web storage. Assumes all data is valid
 * @param b The Book containing valid data to be added
 */
function addBook(b:Book): void
{

}

/**
 * Clears all the error messages from the form
 */
function clearAllErrorMessages() 
{
    let allErrorMessages = document.querySelectorAll(".err-msg");
    for (let i = 0; i < allErrorMessages.length; i++)
    {
        let currentElement = allErrorMessages[i];
        currentElement.textContent = "";
    }
}