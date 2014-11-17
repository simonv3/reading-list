var app = app || {};

app.BookCollection = Backbone.Collection.extend({
  model: app.Book
});