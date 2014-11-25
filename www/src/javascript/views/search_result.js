var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

module.exports = Backbone.View.extend({
  tagName: 'li',
  template: require('../templates/_search_result_item'),
  events: {
    'click': 'chooseBook',
  },
  initialize: function(options){
    this.options = options || {};
  },
  render: function(){
    this.$el.html( this.template(this.model.toJSON()));
    return this;
  },
  chooseBook: function(event){

    pubSub.trigger('add:shelf', this.model);

    // add a book to the currently viewing shelf
  }
});
