var Backbone = require('backbone');
var BookCollection = require('../collections/book_collection')

module.exports = Backbone.Model.extend({
  defaults: {
    name: ''
  },
  initialize: function(options){
    this.set('name', options.name);
    this.set('nested', options.collection || new BookCollection());
    pubSub.on('add:book', this.addBookToShelf, this);
    pubSub.on('remove:book', this.removeBookFromShelf, this);
  },
  setActive: function(val){
    // the active status of model is actually
    // dependent on the collection the model is in
    this.trigger('setactive', this);
  },
  addBookToShelf: function(book){
    if (this.get('active')){
      book.set('shelf', this.get('name'));

      this.get('nested').add(book);

      // The below probably needs to be moved
      // to a sync routine
      hoodie.store.add('book', book.toJSON()).then(function(object){
        book.set('id', object.id);
      });
    }
  },
  removeBookFromShelf: function(book){
    var that = this;
    if (that.get('active')){
      hoodie.store.remove('book', book.get('id'))
        .then(function(){
          that.get('nested').remove(book);
      });
    }
  }
});
