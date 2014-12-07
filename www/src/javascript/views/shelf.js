var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

module.exports = Backbone.View.extend({
  tagName: 'li',
  template: require('../templates/_shelf_list_item'),
  attributes : function () {
    return {
      class : this.model.get('active') ? 'active' : '',
    };
  },
  events: {
    'click': 'view',
    'click i.fa-trash ': 'removeShelf'
  },
  initialize: function(){
    // this.model.on('change:active', this.setCollection, this);
  },
  render: function(){
    this.$el.html( this.template(this.model.toJSON()));
    return this;
  },
  view: function( event ){
    this.model.setActive(true);
  },
  removeShelf: function( event ){
    if (confirm('Are you sure?')){
      this.remove();
      pubSub.trigger('remove:shelf', this.model);
    } else {
      console.log('fail');
    }
  }

});
