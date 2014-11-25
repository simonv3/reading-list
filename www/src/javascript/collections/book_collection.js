var Backbone = require('backbone');
var Book = require('../models/book');

module.exports = Backbone.Collection.extend({
  model: Book
});