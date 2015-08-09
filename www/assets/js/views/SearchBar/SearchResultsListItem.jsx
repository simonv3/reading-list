var SearchResultsListItem = React.createClass({
    render: function() {
        return (<li>{this.props.searchResult.title}</li>);
    }
});

module.exports = SearchResultsListItem;
