import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'

class BooksSearch extends Component {

  static propTypes = {
    myBooks: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired
  }

  state = {
    query: '',
    booksSearchResult: []
  }

  searchBooks = (query) => {
    if (query) {
      BooksAPI.search(escapeRegExp(query), 100).then((books) => {
        if (books && books.length > 0) {
          this.setState({booksSearchResult: books})
        }
      })
    } else {
      this.setState({booksSearchResult: []})
    }
    this.setState({ query: query.trim() })
  }

  onShelfChange(shelf, book) {
    this.props.onShelfChange(shelf, book)
  }

  render() {
    const { query, booksSearchResult } = this.state
    const { myBooks } = this.props

    let showingBooks;
    //update shelf of books from search results if book is present in myreads
    showingBooks = booksSearchResult.map(function(searchBook) {
      let bookFound = false
      myBooks.forEach(function(myBook){
        if(myBook.id === searchBook.id) {
          searchBook.shelf = myBook.shelf
          bookFound = true
        }
      })
      if (!bookFound) {
        searchBook.shelf = '';
      }
      return searchBook;
    })

    if (showingBooks) {
      showingBooks.sort(sortBy('title'))
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className='close-search'>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.searchBooks(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {showingBooks && showingBooks.length>0 && showingBooks.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${(book.imageLinks && book.imageLinks.smallThumbnail) ? book.imageLinks.smallThumbnail : ''})` }}></div>
                    <div className="book-shelf-changer">
                      <select value={book.shelf}
                              onChange={(event) => this.onShelfChange(event.target.value, book)}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">
                    {book.length>0 && book.authors.map((author, i) => (
                      author
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BooksSearch
