'use strict';

// require('./login.js');

// initialize Hoodie

var hoodie = new Hoodie();

var models = require('./models/models.js');

var ReadingList = require('./views/ReadingList.jsx');

var BOOKS = [
  {title: 'Mountains Beyond Mountains', author_data: [{name:'Tracy Kidder'}], tags: ['to-read']},
  {title: 'Jane', author_data: [{name: 'Normark'}], tags: ['reading']},
  {title: 'Ruby On Rails', author_data: [{name: 'Various'}], tags: ['reading']},
  {title: 'The handmaid\'s tale', author_data: [{name: 'Margaret Atwood'}], tags: ['sci-fi']},
  {title: 'The Next Revolution', author_data: [], tags: ['to-read']},
];

React.render(<ReadingList hoodie={hoodie} initialBooks={BOOKS}/>, document.body);
