var models = require('../models/models.js');

var SearchBar = require('./SearchBar/SearchBar.jsx');
var BookList = require('./BookList/BookList.jsx');

var ReadingList = React.createClass({
  getInitialState: function() {
    return {
      searchResults: new models.BookCollection()
    };
  },
  handleUserSearchQuery: function(searchQuery) {
    var searchResults = [];
    var that = this;

    if (searchQuery.length >= 3) {
      this.props.hoodie.isbn.searchbooks({
        query: searchQuery
      }).fail(function(e) {
        console.log('there was an error', e);
      }).done(function(search) {
        searchResults = new models.BookCollection();
        searchResults.set(search.result.data)
        that.setState({
          searchResults: searchResults.toJSON()
        });
      })
    }
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
        <SearchBar searchResults={this.state.searchResults}
                   onUserEntersSearch={this.handleUserSearchQuery}/>
        <BookList books={this.props.books}
                  currentlyReading={currentlyReading}/>
      </div>
    );
  }
});

module.exports = ReadingList;
