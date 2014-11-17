var app = app || {};

app.ShelfCollection = Backbone.Collection.extend({
  model: app.Shelf,
  initialize: function(){
      this.on('setactive', this.setActive);
  },
  setActive: function(model){
    // only one shelf can be set to active at a 
    // time.
    this.models.forEach(function( item ){
      if (item.get('name') === model.get('name')){
        item.set('active', true);
        app.pubSub
          .trigger('viewingNewShelf', item.get('nested'));
      } else {
        item.set('active', false);
      }
      app.pubSub.trigger('renderShelves');
    });
  }
});