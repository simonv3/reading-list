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
  setIndexAsActive: function( index ){
    this.collection.models[index].setActive(true);
    this.render();
  }
});
