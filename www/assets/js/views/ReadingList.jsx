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
    var searchResults = new models.BookCollection();
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
        search.result.data.forEach(function(datum) {
          var book = new models.BookModel({
            title: datum.title,
            authors: datum.author_data,
            isbn10: datum.isbn10,
            isbn13: datum.isbn13
          });

          searchResults.add(book);
        });
        that.setState({
          searchResults: searchResults,
          isSearching: false,
        });
      })
    } else {
      that.setState({
        isSearching: false
      })
    }
  },

  addTagToBook: function(book, input) {
    var tags = _.isString(input) ? [input] : input;

    tags.forEach(function(tag) {
      console.log(book);
      book.get('tags').add({
        name: tag
      });
    })

    var books = this.state.books;
    // console.log(books);
    books.add(book);

    // console.log(newBooks);

    this.setState({
      books: books,
      searchResults: [],
      searchQuery: ''
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

    return (
      <div className="container">
        <h1>Read</h1>
        <SearchBar searchResults={this.state.searchResults}
                   isSearching={this.state.isSearching}
                   onUserEntersSearch={this.handleSearchChange}
                   addTagToBook={this.addTagToBook}
                   searchQuery={this.state.searchQuery}/>
        <BookList books={this.state.books}/>
      </div>
    );
  }
});

module.exports = ReadingList;
