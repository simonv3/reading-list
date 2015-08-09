'use strict'

// require('./login.js');

// initialize Hoodie

require('./models/models.js');

var ReadingList = require('./views/ReadingList.jsx');

var SEARCH_RESULTS = [
  {title: 'Jane', author: 'Normark'},
  {title: 'Mountains Beyond Mountains', author: 'Tracy Kidder'},
  {title: 'The handmaid\'s tale', author: 'Margaret Atwood'},
];

var BOOKS = [
  {title: 'Mountains Beyond Mountains', author: 'Tracy Kidder', tags: ['to-read']},
  {title: 'Jane', author: 'Normark', tags: ['reading']},
  {title: 'Ruby On Rails', author: 'Various', tags: ['reading']},
  {title: 'The handmaid\'s tale', author: 'Margaret Atwood', tags: ['sci-fi']},
  {title: 'The Next Revolution', author: 'Murray Bookchin', tags: ['to-read']},
];

React.render(<ReadingList searchResults={SEARCH_RESULTS} books={BOOKS}/>, document.body);

// React.renderComponent(ReadingList(), document.getElementById('content'))

// _.templateSettings = {
//   interpolate: /\{\%(.+?)\%\}/g,
//   escape: /\{\{\-(.+?)\}\}/g,
//   evaluate: /\{\{(.+?)\}\}/g
// };

// var searchResultListTemplate = _.template($("#search-result-list").html());
// var bookListTemplate = $("#book-list").html();

// var books = new BookCollection();
// var searchResults = new BookCollection();

// $('#search-online').on('keyup', $.debounce(function(event) {
//   searchResults.reset();
//   var stillTyping = true;
//   var val = event.target.value;
//   // Be nice to the search
//   if (val.length >= 3){
//     $('#loading').show();
//     hoodie.isbn.searchbooks({
//       query: val
//     }).fail(function(){
//       console.log('fail');
//       $('#loading').hide();
//     }).done(function(search){
//       searchResults.set(search.result.data);
//       $('#loading').hide();
//       var data = {
//           books: searchResults.toJSON()
//       };
//       $("#search-results").html(searchResultListTemplate(data));
//     });
//   }
// }, 555));
