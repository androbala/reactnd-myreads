import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BooksSearch from './BooksSearch'
import MyReads from './MyReads'
import './App.css'

class BooksApp extends React.Component {
  state = {
    myBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ myBooks: books })
    })
  }

  onShelfChange(shelf, book) {
    let booksUpdated = this.state.myBooks
    let bookFound = false;
    //Update Backend by Calling Books Update API
    BooksAPI.update(book, shelf).then((res) => {
      //update book shelf if book is already present
      for(var i=0; i<booksUpdated.length; i++) {
        if(booksUpdated[i].id === book.id) {
          booksUpdated[i].shelf = shelf;
          bookFound = true
        }
      }
      //add book to collection if book is not present
      if(!bookFound) {
          book.shelf = shelf
          booksUpdated.push(book)
      }
      //update local state of books
      this.setState({myBooks: booksUpdated})
    })
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={({history}) => (
          <BooksSearch
            myBooks={this.state.myBooks}
            onShelfChange={(shelf, book) => {
              this.onShelfChange(shelf, book)
              history.push('/')
            }}
          />
        )}/>
        <Route exact path='/' render={() => (
          <MyReads
            myBooks={this.state.myBooks}
            onShelfChange={(shelf, book) => {
              this.onShelfChange(shelf, book)
            }}
          />
        )}/>
      </div>
    )}
}

export default BooksApp
