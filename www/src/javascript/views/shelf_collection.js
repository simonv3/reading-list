var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var ShelfView = require('./shelf');

module.exports = Backbone.View.extend({
  el: '#shelflist',
  initialize: function(collection){
    this.collection = collection;
    this.render();
    pubSub.on('renderShelves', this.render, this);
    pubSub.on('remove:shelf', this.removeShelf, this);
  },
  render: function(){
    this.$el.html('');
    this.collection.each(function( item ){
      this.renderShelf(item);
    }, this);
  },
  renderShelf: function( item ){
    var shelfView = new ShelfView({ model: item });
    this.$el.append(shelfView.render().el);
  },
  addShelf: function( shelf ){
    this.collection.add(shelf);
    this.render();
  },
  removeShelf: function ( shelf ){
    var that = this;
    hoodie.store.remove('shelf', shelf.get('id'))
        .then(function(){
          that.collection.remove(shelf);
        });
  },
  setIndexAsActive: function( index ){
    this.collection.models[index].setActive(true);
    this.render();
  }
});
