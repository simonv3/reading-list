var app = app || {};

app.BookCollectionView = Backbone.View.extend({
  el: '#booklist',
  initialize: function(initialBooks){
    this.collection = new app.BookCollection(initialBooks);
    this.render();
    this.listenTo( this.collection, 'add', this.renderBook );
  },
  render: function(){
    this.collection.each(function( item ){
      this.renderBook(item);
      console.log(this);
    }, this);
  },
  renderBook: function( item ){
    var bookView = new app.BookView({ model: item });
    this.$el.append(bookView.render().el);
  }
});