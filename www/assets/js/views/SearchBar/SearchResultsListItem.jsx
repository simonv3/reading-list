var SearchResultsListItem = React.createClass({
    render: function() {
      var author;
      var author_data = this.props.searchResult.author_data;
      if (author_data.length > 0) {
        author = author_data[0].name;
      }

      return (
        <li>
          <span className="book-title">{this.props.searchResult.title}</span>
          <span className="book-author">{author}</span>
          <span className="actions">
            <a>view</a>
            <a>mark as <span className="tag">#to-read</span></a>
          </span>
        </li>
      );
    }
});

module.exports = SearchResultsListItem;
