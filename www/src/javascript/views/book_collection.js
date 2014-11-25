var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var BookCollection = require('../collections/book_collection')
var BookView = require('./book');

module.exports = Backbone.View.extend({
  el: '#booklist',
  initialize: function(initialBooks){
    this.collection = []
    this.collection = new BookCollection(initialBooks);
    this.render();
    pubSub
      .on('viewingNewShelf', this.setBookCollection, this);
  },
  render: function(){
    this.$el.html('');
    this.collection.forEach(function( item ){
      this.renderBook(item);
    }, this);
  },
  renderBook: function(item){
    var bookView = new BookView({ model: item });
    this.$el.append(bookView.render().el);
  },
  setBookCollection: function(collection){
    this.collection = collection;
    this.collection.on('add', this.render, this);
    this.render();
  }
});
