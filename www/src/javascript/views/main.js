var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

module.exports = Backbone.View.extend({
  el: '#whatItIs',
  template: require('../templates/main_template'),
  initialize: function(){
    this.render();
  },
  render: function(){
    this.$el.html( this.template({
      contains: [
        'Backbone',
        'Gulp',
        'Handlebars',
        'Sass',
        'Image Compression',
        'NPM',
        'Browserify',
        'CoffeeScript Processing'
        'Hoodie Users',
        'Hoodie Email',
        '(More Hoodie Things Coming Soon Probably)'
      ]}
    ));
  }
});
