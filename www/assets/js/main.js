'use strict';

// require('./login.js');

// initialize Hoodie
var hoodie = new Hoodie();

var models = require('./models/models.js');

var ReadingList = require('./views/ReadingList.jsx');

var BOOKS = [
  {title: 'Mountains Beyond Mountains', author: 'Tracy Kidder', tags: ['to-read']},
  {title: 'Jane', author: 'Normark', tags: ['reading']},
  {title: 'Ruby On Rails', author: 'Various', tags: ['reading']},
  {title: 'The handmaid\'s tale', author: 'Margaret Atwood', tags: ['sci-fi']},
  {title: 'The Next Revolution', author: 'Murray Bookchin', tags: ['to-read']},
];

React.render(<ReadingList hoodie={hoodie} books={BOOKS}/>, document.body);
