var BookListItem = require('./BookListItem.jsx')

var BookList = React.createClass({
  render: function(){

    var currentlyReading = this.props.currentlyReading.map(function(book) {
      return <BookListItem book={book} key={book.title + book.isbn13}/>
    });

    var books = this.props.books.map(function(book) {
      return <BookListItem book={book} key={book.title + book.isbn13}/>
    });

    return (
      <div className="books">
        <h2>Currently Reading</h2>
        <ul>
          {currentlyReading}
        </ul>
        <h2>All Books</h2>
        <ul>
        {books}
        </ul>
      </div>
    );
  }
});

module.exports = BookList;
