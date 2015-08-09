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
          <td >
            <a onClick={this.props.onExpandBookToggle}>
              <i className="fa fa-chevron-down"></i>
            </a>
          </td>
        </tr>
      );
    }
});

module.exports = BookListItemHeader;
