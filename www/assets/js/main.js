'use strict';

// require('./login.js');

// initialize Hoodie

var hoodie = new Hoodie();

var models = require('./models/models.js');

var ReadingList = require('./views/ReadingList.jsx');

var BOOKS = new models.BookCollection();

BOOKS.add(new models.BookModel({
  title: 'Mountains Beyond Mountains',
  authors: [{name:'Tracy Kidder'}],
  tags: new models.TagCollection([{name: 'to-read'}])
}));
BOOKS.add(new models.BookModel({
  title: 'Ruby on Rails',
  authors: [{name:'Various'}],
  tags: new models.TagCollection([{name: 'reading'}])
}));
console.log(BOOKS);
//   {title: 'Jane', author_data: [{name: 'Normark'}], tags: ['reading']},
//   {title: 'Ruby On Rails', author_data: [{name: 'Various'}], tags: ['reading']},
//   {title: 'The handmaid\'s tale', author_data: [{name: 'Margaret Atwood'}], tags: ['sci-fi']},
//   {title: 'The Next Revolution', author_data: [], tags: ['to-read']},
// ];

React.render(<ReadingList hoodie={hoodie} initialBooks={BOOKS}/>, document.body);
