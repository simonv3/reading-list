var app = app || {};

app.BookView = Backbone.View.extend({
  tagName: 'li',
  // bookTpl: _.template($("#reading-list-item-template").html()),
  events: {
    'click i.remove': 'deleteBook',
  },
  initialize: function(options){
    this.options = options || {};
  },
  render: function(){
    this.$el.html( render('_reading_list_item', this.model.toJSON()));
    // this.$el.html( this.bookTpl(this.model.toJSON()));
    return this;
  },
  deleteBook: function(){
    this.remove();
    // this.model.delete();
    console.log('deleting the book');
    app.pubSub.trigger('remove:shelf', this.model);

    // console.log(this.model.get('id'));
    
  }
});