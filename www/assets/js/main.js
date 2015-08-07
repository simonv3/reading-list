'use strict'

// _.templateSettings = {
//   interpolate: /\{\%(.+?)\%\}/g,
//   escape: /\{\{\-(.+?)\}\}/g,
//   evaluate: /\{\{(.+?)\}\}/g
// };

var searchResultListTemplate = _.template($("#search-result-list").html());
var bookListTemplate = $("#book-list").html();

// initialize Hoodie
var hoodie  = new Hoodie();

var ReadDateModel = hoodie.backbone.Model.extend({
  type: 'read-date',
  dateStarted: null,
  progress: 0,
  dateEnded: null
});

var ReadDateCollection = hoodie.backbone.Collection.extend({
  model: ReadDateModel
});

var TagModel = hoodie.backbone.Model.extend({
  type: 'tag',
  name: null,
  dateAdded: null,
});

var TagCollection = hoodie.backbone.Collection.extend({
  model: TagModel
});

var LinkModel = hoodie.backbone.Model.extend({
  type: 'link',
  name: null,
  url: null,
  dateAdded: null,
});

var LinkCollection = hoodie.backbone.Collection.extend({
  model: LinkModel
});

var BookModel = hoodie.backbone.Model.extend({
  type: 'book',
  notes: null,
  isbn10: null,
  rating: null,
  readDates: new ReadDateCollection(),
  tags: new TagCollection(),
  links: new LinkCollection(),
});

var BookCollection = hoodie.backbone.Collection.extend({
  model: BookModel
});

var books = new BookCollection();
var searchResults = new BookCollection();

$('#search-online').on('keyup', $.debounce(function(event) {
  searchResults.reset();
  var stillTyping = true;
  var val = event.target.value;
  // Be nice to the search
  if (val.length >= 3){
    $('#loading').show();
    hoodie.isbn.searchbooks({
      query: val
    }).fail(function(){
      console.log('fail');
      $('#loading').hide();
    }).done(function(search){
      searchResults.set(search.result.data);
      $('#loading').hide();
      var data = {
          books:searchResults.models
      };
      $("#search-results").html(searchResultListTemplate(data));
    });
  }
}, 555));
