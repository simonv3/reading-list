var SearchResultsListItem = require('./SearchResultsListItem.jsx');

var SearchBar = React.createClass({
    handleChange: function() {
        this.props.onUserInput(
            this.refs.searchQueryInput.getDOMNode().value
        )
    },
    render: function() {
        var searchResults = [];
        this.props.searchResults.filter(function(searchResult) {
            var searchQuery = this.props.searchQuery;
            var title = searchResult.title.toLowerCase();
            return title.indexOf(searchQuery) !== -1
        }.bind(this)).forEach(function(searchResult) {
            searchResults.push(<SearchResultsListItem searchResult={searchResult} key={searchResult.title} />)
        });
        return (
            <div class="search-bar">
                <form>
                    <input type="text"
                           placeholder="Search..."
                           value={this.props.searchQuery}
                           ref="searchQueryInput"
                           onChange={this.handleChange}/>
                </form>
                <ul>
                    {searchResults}
                </ul>
            </div>
        );
    }
});

module.exports = SearchBar;
