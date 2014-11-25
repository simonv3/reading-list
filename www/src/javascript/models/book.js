var Backbone = require('backbone');
var moment = require('moment');

module.exports = Backbone.Model.extend({
  defaults: {
    title: '',
    read: false,
    isbn10: '',
    isbn13: '',
    author_data: [],
    dateAdded: moment()
  }, 
  initialize: function(){
  }
});