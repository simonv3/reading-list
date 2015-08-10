var SearchResultsListItem = React.createClass({

  onToReadClickHandler: function() {
    this.props.addBookToTag(this.props.searchResult, 'to-read')
  },

  render: function() {

    var author_data = this.props.searchResult.author_data;

    var author = author_data.length > 0 ? author_data[0].name : '...';

    return (
      <li className="row search-result">
        <span className="book-title four columns">
          {this.props.index + '. '}
          <strong>{this.props.searchResult.title}</strong>
        </span>
        <span className="book-author four columns">{author}</span>
        <span className="actions four columns">
          {/*<button className="to-view pill">view</button>*/}
          <button className="add-to-read pill"
                  onClick={this.onToReadClickHandler}>
            mark as <span className="tag">#to-read</span>
          </button>
        </span>
      </li>
    );
  }
});

module.exports = SearchResultsListItem;
