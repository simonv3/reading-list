var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var BookCollection = require('../collections/book_collection')
var BookView = require('./book');
var SearchResultView = require('./search_result');

module.exports = Backbone.View.extend({
  el: '#searchresults',
  initialize: function(searchResults){
    this.collection = new BookCollection(searchResults);
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
    var searchResultView = new SearchResultView({ model: item });
    this.$el.append(searchResultView.render().el);
  }
});
