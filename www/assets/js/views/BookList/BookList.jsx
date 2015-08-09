var BookListItem = require('./BookListItem.jsx')

var BookList = React.createClass({
  render: function(){

    var currentlyReading = this.props.currentlyReading.map(function(book) {
      return <BookListItem book={book} />
    });

    var books = this.props.books.map(function(book) {
      return <BookListItem book={book} />
    });

    return (
      <table className="books">
        <h2>Currently Reading</h2>
          <table>
            <tbody>
              {currentlyReading}
            </tbody>
          </table>
        <h2>All Books</h2>
          <table>
            <tbody>
              {books}
            </tbody>
          </table>
      </table>
    );
  }
});

module.exports = BookList;
