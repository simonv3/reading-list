var models = require('../models/models.js');

var SearchBar = require('./SearchBar/SearchBar.jsx');
var BookList = require('./BookList/BookList.jsx');

var ReadingList = React.createClass({
  getInitialState: function() {
    return {
      books: this.props.initialBooks,
      searchResults: new models.BookCollection(),
      isSearching: false,
      searchQuery: '',
    };
  },

  handleUserSearchQuery: function(searchQuery) {
    var searchResults = [];
    var that = this;

    that.setState({
      isSearching: true,
      searchResults: searchResults
    });

    if (searchQuery.length >= 3) {
      this.props.hoodie.isbn.searchbooks({
        query: searchQuery
      }).fail(function(e) {
        console.log('there was an error', e);
      }).done(function(search) {
        searchResults = new models.BookCollection();
        searchResults.set(search.result.data)
        that.setState({
          searchResults: searchResults.toJSON(),
          isSearching: false
        });
      })
    } else {
      that.setState({
        isSearching: false
      })
    }
  },

  addBookToTag: function(book, input) {
    console.log('adding book');
    var tags = _.isString(input) ? [input] : input;

    book.tags ? book.concat(input) : book.tags = input;

    var books = this.state.books;
    var newBooks = books.concat([book]);

    this.setState({
      books: newBooks,
      searchResults: []
    });
  },

  handleSearchChange: function(event) {
    this.setState({
      searchQuery: event.target.value
    });
    this.handleSearchDebounced();
  },

  // Create a handleSearchDebounced that debounces
  // the propped onUserEntersSearch
  // Have a look at: http://stackoverflow.com/a/24679479/154392
  componentWillMount: function () {
    this.handleSearchDebounced = _.debounce(function () {
      this.handleUserSearchQuery(this.state.searchQuery);
    }, 500);
  },

  render: function(){

    var currentlyReading = this.state.books.filter(function(book) {
      return book.tags.indexOf('reading') !== -1;
    });

    return (
      <div className="container">
        <h1>Read</h1>
        <SearchBar searchResults={this.state.searchResults}
                   isSearching={this.state.isSearching}
                   onUserEntersSearch={this.handleSearchChange}
                   addBookToTag={this.addBookToTag}
                   searchQuery={this.state.searchQuery}/>
        <BookList books={this.state.books}
                  currentlyReading={currentlyReading}/>
      </div>
    );
  }
});

module.exports = ReadingList;
