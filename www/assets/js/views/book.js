var app = app || {};

app.BookView = Backbone.View.extend({
  tagName: 'li',
  bookTpl: _.template($("#reading-list-item-template").html()),
  events: {
    'click i.remove': 'deleteBook',
  },
  initialize: function(options){
    this.options = options || {};
  },
  render: function(){
    this.$el.html( this.bookTpl(this.model.toJSON()));
    return this;
  },
  deleteBook: function(){
    this.remove();
    hoodie.store.remove('book', this.model.get('id'))
      .then(function(){

      });
  }
});