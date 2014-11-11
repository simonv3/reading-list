var app = app || {};

app.SearchResultsView = Backbone.View.extend({
  el: '#searchresults',
  initialize: function(searchResults){
    this.collection = new app.BookCollection(searchResults);
    this.render();
    this.listenTo( this.collection, 'add', this.renderBook );
  },
  reset: function(){
    this.$el.html('');
    this.collection.reset();
  },
  render: function(){
    this.collection.each(function( item ){
      this.renderBook(item);
    }, this);
  },
  renderBook: function( item ){
    var searchResultView = new app.SearchResultView({ model: item });
    this.$el.append(searchResultView.render().el);
  }
});