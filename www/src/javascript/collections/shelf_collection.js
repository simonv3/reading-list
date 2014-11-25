var Backbone = require('backbone');
var Shelf = require('../models/shelf');

module.exports = Backbone.Collection.extend({
  model: Shelf,
  initialize: function(){
      this.on('setactive', this.setActive);
  },
  setActive: function(model){
    // only one shelf can be set to active at a 
    // time.
    this.models.forEach(function( item ){
      if (item.get('name') === model.get('name')){
        item.set('active', true);
        pubSub
          .trigger('viewingNewShelf', item.get('nested'));
      } else {
        item.set('active', false);
      }
      pubSub.trigger('renderShelves');
    });
  }
});
