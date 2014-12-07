var Backbone = require('backbone');
var Shelf = require('../models/shelf');

module.exports = Backbone.Collection.extend({
  model: Shelf,
  comparator: function(a, b){
    // Put 'other' last
    if (b.get('name') === 'other'){
      return -1;
    } else if (a.get('name') === 'other'){
      return 1;
    } else {
      if (a.get('name') > b.get('name')){
        return 1;
      } else {
        return -1;
      }
    }
    return 0;
  },
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
