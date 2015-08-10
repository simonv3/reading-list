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
        var key = searchResult.attributes.isbn13;
        searchResults.push(<SearchResultsListItem
                               index={index + 1}
                               searchResult={searchResult}
                               addTagToBook={that.props.addTagToBook}
                               key={key} />);
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
