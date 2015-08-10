var BookListItemHeader = React.createClass({
    render: function() {

      var actionClasses = classNames('fa', 'fa-chevron-down', {
        'upside-down': this.props.expandBook,
      });

      var author_data = this.props.book.author_data;

      var author = author_data.length > 0 ? author_data[0].name : '...';

      return (
        <div className="twelve columns">
          <div className="five columns book-data">
            {this.props.book.title}
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
