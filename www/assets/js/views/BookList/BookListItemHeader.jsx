var BookListItemHeader = React.createClass({
    render: function() {

      return (
        <tr>
          <td>
            {this.props.book.title}
          </td>
          <td>
            {this.props.book.author}
          </td>
          <td onClick={this.props.onExpandBookToggle}>
            <i className="fa fa-chevron-down"></i>
          </td>
        </tr>
      );
    }
});

module.exports = BookListItemHeader;
