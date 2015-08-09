var SearchResultsListItem = require('./SearchResultsListItem.jsx');
var SearchInput = require('./SearchInput.jsx');

var SearchBar = React.createClass({

  render: function() {
    var searchResults = [];

    this.props.searchResults
      .forEach(function(searchResult) {
        searchResults.push(<SearchResultsListItem
                               searchResult={searchResult}
                               key={searchResult.isbn13} />);
    });
    return (
      <div class="search-bar">
        <form>
          <SearchInput onUserEntersSearch={this.props.onUserEntersSearch}/>
        </form>
        <ul>
          {searchResults}
        </ul>
      </div>
    );
  }
});

module.exports = SearchBar;
