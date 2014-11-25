'use strict';
 
var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

module.exports = Backbone.View.extend({
  tagName: 'li',
  template: require('../templates/_reading_list_item'),
  events: {
    'click i.remove': 'deleteBook',
  },
  initialize: function(options){
    this.options = options || {};
  },
  render: function(){
    this.$el.html( this.template(this.model.toJSON()));
    return this;
  },
  deleteBook: function(){
    this.remove();
    console.log('deleting the book');
    pubSub.trigger('remove:shelf', this.model);    
  }
});
