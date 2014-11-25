var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

module.exports = Backbone.View.extend({
  el: '#accountWrapper',
  template: require('../templates/_hoodie_account_bar'),
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
