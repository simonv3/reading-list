var app = app || {};

app.BookCollectionView = Backbone.View.extend({
  el: '#booklist',
  initialize: function(initialBooks){
    this.collection = []
    this.collection = new app.BookCollection(initialBooks);
    this.render();
    app.pubSub
      .on('viewingNewShelf', this.setBookCollection, this);
  },
  render: function(){
    this.$el.html('');
    this.collection.forEach(function( item ){
      this.renderBook(item);
    }, this);
  },
  renderBook: function(item){
    var bookView = new app.BookView({ model: item });
    this.$el.append(bookView.render().el);
  },
  setBookCollection: function(collection){
    console.log('collection: ', collection);
    this.collection = collection;
    this.collection.on('add', this.render, this);
    this.render();
  }
});