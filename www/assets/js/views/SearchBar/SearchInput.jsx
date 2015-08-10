var SearchInput = React.createClass({


  render: function() {
    return (
        <input type="text"
               className="twelve columns"
               placeholder="Search..."
               value={this.props.searchQuery}
               ref="searchQueryInput"
               onChange={this.props.onUserEntersSearch}/>
      )
  }
});

module.exports = SearchInput;
