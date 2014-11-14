var app = app || {};

app.BookCollectionView = Backbone.View.extend({
  el: '#booklist',
  initialize: function(initialBooks){
    this.collection = new app.BookCollection(initialBooks);
    this.render();
    
    // app.pubSub.on('refreshbookcollection', this.render);
  },
  render: function(){
    // console.log(this.collection);
    console.log(this.collection);
    this.$el.html('');
    this.collection.each(function( item ){
      this.renderBook(item);
    }, this);
  },
  renderBook: function(item){
    var bookView = new app.BookView({ model: item });
    this.$el.append(bookView.render().el);
  },
  setBookCollection: function(collection){
    this.collection = collection;
    console.log('setting book collection');
    this.collection.on('add', this.render, this);
    this.render();
  }
});