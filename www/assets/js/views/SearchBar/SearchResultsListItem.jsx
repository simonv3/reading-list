var SearchResultsListItem = React.createClass({

  onToReadClickHandler: function() {
    this.props.addTagToBook(this.props.searchResult, 'to-read')
  },

  onReadingClickHandler: function() {
    this.props.addTagToBook(this.props.searchResult, 'reading')
  },

  render: function() {

    var searchResult = this.props.searchResult;

    var authors = searchResult.get('authors');

    var author = authors.length > 0 ? authors[0].name : '...';

    return (
      <li className="row search-result">
        <span className="book-title four columns">
          {this.props.index + '. '}
          <strong>{this.props.searchResult.get('title')}</strong>
        </span>
        <span className="book-author four columns">{author}</span>
        <span className="actions four columns">
          {/*<button className="to-view pill">view</button>*/}
          mark as
          <button className="add-to-read pill"
                  onClick={this.onToReadClickHandler}>
            <span className="tag">#to-read</span>
          </button>
          <button className="add-reading pill"
                  onClick={this.onReadingClickHandler}>
            <span className="tag">#reading</span>
          </button>
        </span>
      </li>
    );
  }
});

module.exports = SearchResultsListItem;
