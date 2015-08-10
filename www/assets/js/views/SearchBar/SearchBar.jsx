var SearchResultsListItem = require('./SearchResultsListItem.jsx');
var SearchInput = require('./SearchInput.jsx');

var SearchBar = React.createClass({

  // getInitialState: function () {
  //   return {
  //     query: this.props.query
  //   };
  // },

  render: function() {
    var that = this;
    var searchResults = [];

    this.props.searchResults
      .forEach(function(searchResult, index) {
        searchResults.push(<SearchResultsListItem
                               index={index + 1}
                               searchResult={searchResult}
                               addBookToTag={that.props.addBookToTag}
                               key={searchResult.isbn13} />);
    });

    var olClasses = classNames({
      'collapsed': this.props.searchResults.length === 0
    });

    return (
      <div className="search-bar">
        <form className="row">
          <SearchInput onUserEntersSearch={this.props.onUserEntersSearch}
                       searchQuery={this.props.searchQuery}/>
          { this.props.isSearching ? <i className="fa fa-spinner fa-spin"></i> : ' '}
        </form>
        <ol className={olClasses}>
          {searchResults}
        </ol>
      </div>
    );
  }
});

module.exports = SearchBar;
