var SearchInput = React.createClass({
  getInitialState: function () {
    return {
      query: this.props.query
    };
  },

  handleChange: function(event) {
    this.setState({query: event.target.value});
    this.handleSearchDebounced();
  },

  // Create a handleSearchDebounced that debounces
  // the propped onUserEntersSearch
  // Have a look at: http://stackoverflow.com/a/24679479/154392
  componentWillMount: function () {
    this.handleSearchDebounced = _.debounce(function () {
      this.props.onUserEntersSearch(this.state.query);
    }, 500);
  },

  render: function() {
    return (
        <input type="text"
               placeholder="Search..."
               value={this.state.searchQuery}
               ref="searchQueryInput"
               onChange={this.handleChange}/>
      )
  }
});

module.exports = SearchInput;
