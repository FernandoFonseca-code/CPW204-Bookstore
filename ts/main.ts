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

window.onload = function() 
{// the querySelector function requires a CSS id tag
    let addBookButton = document.querySelector("#addBookButton") as HTMLButtonElement;
    addBookButton.onclick = processBook;
}     

function processBook() 
{
    let userBook = getBook();
    if (userBook != null){
        addBookToWebPage(userBook);
        addBookToStorage(userBook);
    }
}
/**
 * This function will retrieve all the book data from the HTML page. If all data 
 * is valid a Book object will be returned. If any data is invalid, null will 
 * be returned and error messages will be displayed 
 */
function getBook():Book | null
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
    // The 'T07:00:00Z' is added to the date string to make sure UTC and local time zone (Pacific) match
    let releaseDate:Date = new Date(releaseDateFormField.value + 'T08:00:00Z');
    
    if (isNaN(releaseDate.getTime()))
    {
        isValidData = false;
        let releaseDateErrorTextBox = releaseDateFormField.nextElementSibling as HTMLElement;
        releaseDateErrorTextBox.textContent = "Release date must be a valid date"
    }

    if (isValidData)
    {
        //  Create and populate a Book object if all data is valid
        let addedBook = new Book();
        addedBook.isbn = isbn;
        addedBook.title = title;
        addedBook.price = price;
        addedBook.releaseDate = new Date(releaseDate);

        return addedBook;
    }
    return null;
}

/**
 * This validates an ISBN 13 number
 * @param data The string to be validated
 * @returns True if data is a valid ISBN 13
 */
function isValidISBN13(data: string) 
{
    let isbnRegex = /^(?:\d{10}|\d{13})$/;
    // Check if the ISBN matches the regex
        return isbnRegex.test(data);
}

/**
 * Adds a Book object to the web page. Assumes all data is valid
 * @param b The Book containing valid data to be added
 */
function addBookToWebPage(b:Book): void
{
    console.log(b);
    /* Add the book to the web page */

    // creates a new div element
    let bookDiv:HTMLDivElement = document.createElement("div");

    // create an h2 element
    let titleHeading:HTMLHeadingElement = document.createElement("h2");
    titleHeading.textContent = `${b.title} : ${b.isbn}`; // This is a template literal instead of concatenation
    
    //create a paragraph element
    let bookDescription:HTMLParagraphElement = document.createElement("p");
    bookDescription.textContent = `This book will be released on ${b.releaseDate.toDateString()}
    and will cost $${b.price.toFixed(2)}`;

    // Add h2 and p to book div element
    bookDiv.appendChild(titleHeading); 
    bookDiv.appendChild(bookDescription);

    // Add bookDiv to the web page
    let BookListDisplay = document.querySelector("#book-display") as HTMLDivElement;
    BookListDisplay.appendChild(bookDiv);
}
/**
 * Adds a single Book object to existing book list in storage.
 * If no book list exists, a new book list will be created.
 * @param b The Book object to be added to storage
 */
function addBookToStorage(b:Book): void
{
    const BookStorageKey = "Books";
    // Read existing books out of storage
    let bookData = localStorage.getItem(BookStorageKey);
    // if book Data is null, the "Books" key did not exist
    if (bookData == null)
    {
        //Create a new list and add out current book
        let books:Book[] = [];
        books.push(b);

        // Add to local storage
        bookData = storeBooksInLocalStorage(bookData, books, BookStorageKey);
    }
    else
    {
        // Parse to string into a list of books and add new book to the list
        // store the newly modified list back in storage
        let books:Book[] = JSON.parse(bookData);
        books.push(b);

        bookData = storeBooksInLocalStorage(bookData, books, BookStorageKey);
    }
}

function storeBooksInLocalStorage(bookData: string | null, books: Book[], BookStorageKey: string) {
    bookData = JSON.stringify(books);
    localStorage.setItem(BookStorageKey, bookData);
    return bookData;
}

/**
 * Clears all the error messages from the form
 */
function clearAllErrorMessages() 
{
    let allErrorMessages = document.querySelectorAll(".error-msg");
    for (let i = 0; i < allErrorMessages.length; i++)
    {
        let currentElement = allErrorMessages[i];
        currentElement.textContent = "";
    }
}