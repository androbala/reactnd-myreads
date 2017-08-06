import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BooksShelf from './BooksShelf'

class MyReads extends Component {

  static propTypes = {
    myBooks: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired
  }

  render() {
    const { myBooks } = this.props
    let booksCurrentlyReading = []
    let booksWantToRead = []
    let booksRead = []

    myBooks.forEach(function(book) {
      if (book.shelf === 'currentlyReading') {
        booksCurrentlyReading.push(book);
      } else if (book.shelf === 'wantToRead') {
        booksWantToRead.push(book);
      } else if (book.shelf === 'read') {
        booksRead.push(book)
      }
    })

    return (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BooksShelf
                  booksOnShelf={booksCurrentlyReading}
                  shelfTitle="Currently Reading"
                  onShelfChange={this.props.onShelfChange}/>
              <BooksShelf
                  booksOnShelf={booksWantToRead}
                  shelfTitle="Want to Read"
                  onShelfChange={this.props.onShelfChange}/>
              <BooksShelf
                  booksOnShelf={booksRead}
                  shelfTitle="Read"
                  onShelfChange={this.props.onShelfChange}/>
            </div>
          </div>
          <div className="open-search">
            <Link to='/search'>Add a book</Link>
          </div>
        </div>
    )
  }
}

export default MyReads
