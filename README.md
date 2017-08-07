## myreads

This project is part of react nano degree program. Myreads project allows you to select and categorize books that you have read, currently reading and want to read.

### Installing Packages

  - `npm install`

### Running Application

  - `npm start`

  - Vist "localhost:3000" in browser to view the application

### Testing application

  - Run the unit tests using `npm test`

### Building application

  - Build the optimized project using `npm build`


Project Structure
```
+--public/    
 |-- index.html
 |-- favicon.ico
+-- src/
 +-- icons/
  |-- add.svg
  |-- arrow-back.svg
  |-- arrow-drop-down.svg
 |-- App.js - This is the root of app. Initializes the app and loads all books for the user.
              Also contains route for books search and my reads page.
 |-- App.css - Styles for app.
 |-- App.test.js - Unit testing for the app.
 |-- BooksAPI.js - JavaScript APIs for the provided Udacity backend.
 |-- BooksSearch.js - Search page to search books and add to myreads page
 |-- BooksShelf.js - Bookshelf component to display the books in each section
 |-- MyReads.js - Myreads page to display all book sections
 |-- index.js - It is used for DOM rendering.
 |-- index.css - Global styles.
|-- .gitignore
|-- CONTRIBUTING.MD - Information about contributing to this repo.
TL;DR - Fork and clone your own version of this to use it.
|-- README.MD - This README file.
|-- SEARCH_TERMS.md - The whitelisted short collection of available search terms
for you to use with the app.
|-- package.json - npm package manager file.
```

## Important (Usage of Search Terms)
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.
