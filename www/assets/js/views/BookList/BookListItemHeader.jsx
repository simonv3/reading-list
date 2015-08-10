var BookListItemHeader = React.createClass({
    render: function() {

      var actionClasses = classNames('fa', 'fa-chevron-down', {
        'upside-down': this.props.expandBook,
      });

      var authors = this.props.book.get('authors');

      var author = authors.length > 0 ? authors[0].name : '...';

      return (
        <div className="twelve columns">
          <div className="five columns book-data">
            {this.props.book.get('title')}
          </div>
          <div className="five columns book-data">
            {author}
          </div>
          <div className="two columns actions book-data">
            <a onClick={this.props.onExpandBookToggle}>
              <i className={actionClasses}></i>
            </a>
          </div>
        </div>
      );
    }
});

module.exports = BookListItemHeader;
