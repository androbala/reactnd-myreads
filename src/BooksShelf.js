import React, { Component } from 'react';
import PropTypes from 'prop-types'
import sortBy from 'sort-by'

class BooksShelf extends Component {

  static propTypes = {
    booksOnShelf: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired,
    shelfTitle: PropTypes.string.isRequired
  }

  onShelfChange(shelf, book) {
    this.props.onShelfChange(shelf, book)
  }

  render() {
    const { shelfTitle, booksOnShelf } = this.props

    if (booksOnShelf) {
      booksOnShelf.sort(sortBy('title'))
    }

    return (
          <div className="bookshelf">
            <h2 className="bookshelf-title">{shelfTitle}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {booksOnShelf && booksOnShelf.length>0 && booksOnShelf.map((book) => (
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

export default BooksShelf
