var SearchBar = require('./SearchBar/SearchBar.jsx');
var BookList = require('./BookList/BookList.jsx');

var ReadingList = React.createClass({
  getInitialState: function() {
    return {
      searchQuery: '',
    };
  },
  handleUserInput: function(searchQuery) {
    this.setState({
      searchQuery: searchQuery
    })
  },
  render: function(){

    var currentlyReading = this.props.books.filter(function(book) {
      return book.tags.indexOf('reading') !== -1;
    });

    var books = this.props.books.filter(function(book) {
      return book.tags.indexOf('reading') === -1;
    });

    return (
      <div className="container">
        <SearchBar searchResults={this.props.searchResults}
                   searchQuery={this.state.searchQuery}
                   onUserInput={this.handleUserInput}/>
        <BookList books={this.props.books}
                  currentlyReading={currentlyReading}/>
      </div>
    );
  }
});
module.exports = ReadingList;
