var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

module.exports = Backbone.View.extend({
  el: '#markAsRead',
  template: require('../templates/_mark_as_read'),
  initialize: function(initialBooks){
    this.render();
  },
  render: function(){
    this.$el.html( this.template({}));
  },
  showForBook: function(book){
    this.render();
  }
});
