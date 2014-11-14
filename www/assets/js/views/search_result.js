var app = app || {};

app.SearchResultView = Backbone.View.extend({
  tagName: 'li',
  bookTpl: _.template($("#search-result-template").html()),
  events: {
    'click': 'chooseBook',
  },
  initialize: function(options){
    this.options = options || {};
  },
  render: function(){
    this.$el.html( this.bookTpl(this.model.toJSON()));
    return this;
  },
  chooseBook: function(event){

    app.pubSub.trigger('add:shelf', this.model);
    // bookCollectionView.collection.add(this.model);

    // add a book to the currently viewing shelf

    // hoodie.store.add('book', this.model.toJSON());
  }
});