var app = app || {};

app.ShelfCollectionView = Backbone.View.extend({
  el: '#shelflist',
  initialize: function(collection){
    this.collection = collection;
    this.render();
    this.collection.on('change:active', this.render, this);
  },
  render: function(){
    this.$el.html('');
    this.collection.each(function( item ){
      this.renderShelf(item);
    }, this);
  },
  renderShelf: function( item ){
    var shelfView = new app.ShelfView({ model: item });
    this.$el.append(shelfView.render().el);
  },
  addShelf: function( shelf ){
    this.collection.add(shelf);
    this.render();
  },
  setIndexAsActive: function( index ){
    this.collection.models[index].set('active', true);
    this.render();
  }
});