var BookListItemHeader = require('./BookListItemHeader.jsx');
var classNames = require('../../../vendor/classnames/index.js');

var BookListItem = React.createClass({
  getInitialState: function() {
    return {
      expandBook: false,
    }
  },
  expandBookToggle: function(e) {
    e.preventDefault();
    this.setState({
      expandBook: !this.state.expandBook
    })
  },
  render: function() {

    var classes = classNames({
      'collapsed': !this.state.expandBook
    }, 'twelve', 'columns', 'book-data');

    return (
      <li className="row book-item">
        <BookListItemHeader book={this.props.book}
                            expandBook={this.state.expandBook}
                            onExpandBookToggle={this.expandBookToggle}/>
        <div className={classes}>
          Book Information
        </div>
      </li>
    );
  }
});

module.exports = BookListItem;

