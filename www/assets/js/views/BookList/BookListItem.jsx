var BookListItemHeader = require('./BookListItemHeader.jsx');
var classNames = require('../../../vendor/classnames/index.js');

var BookListItem = React.createClass({
  getInitialState: function() {
    return {
      expandBook: false,
    }
  },
  expandBookToggle: function() {
    this.setState({
      expandBook: !this.state.expandBook
    })
  },
  render: function() {

    var classes = classNames({
      'collapsed': !this.state.expandBook
    });

    return (
      <div>
        <BookListItemHeader book={this.props.book}
                            expandBook={this.state.expandBook}
                            onExpandBookToggle={this.expandBookToggle}/>
        <tr className={classes}>
          <td colSpan="3">
            Book Information
          </td>
        </tr>
      </div>
    );
  }
});

module.exports = BookListItem;

