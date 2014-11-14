var app = app || {};

app.Shelf = Backbone.Model.extend({
  defaults: {
    name: ''
  },
  initialize: function(options){
    this.set('name', options.name);
    this.set('nested', options.collection || new app.BookCollection());
    app.pubSub.on('add:shelf', this.addBookToShelf, this);
  },
  setActive: function(val){
    this.trigger('setactive', this);
  },
  addBookToShelf: function(book){
    if (this.get('active')){
      this.get('nested').add(book);
    }
  }
});
