var app = app || {};

app.ShelfView = Backbone.View.extend({
  tagName: 'li',
  attributes : function () {
    return {
      class : this.model.get('active') ? 'active' : '',
    };
  },
  shelfTpl: _.template($("#shelf-list-item-template").html()),
  events: {
    'click': 'view'
  },
  initialize: function(){
    // this.model.on('change:active', this.setCollection, this);
  },
  render: function(){
    this.$el.html( this.shelfTpl(this.model.toJSON()));
    return this;
  },
  view: function( event ){
    this.model.setActive(true);
  }
});