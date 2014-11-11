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
  chooseBook: function(){
    console.log(this);
    bookCollectionView.collection.add(this.model);
    hoodie.store.add('book', this.model.toJSON());
  }
});