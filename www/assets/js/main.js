// initialize Hoodie
var hoodie  = new Hoodie();

var app = app || {};

// create a publisher subscriber model
app.pubSub = _.extend({}, Backbone.Events);

// Instantiate main book collection view.
var bookCollectionView = new app.BookCollectionView();

// Instantiate search results.
var searchResultsView = new app.SearchResultsView();

// initial load of all book items from the store

var shelfCollection;
var shelvesCollectionView;

hoodie.store.findAll('shelf').then(function(allShelves){
  shelfCollection = new app.ShelfCollection(allShelves);
  shelvesCollectionView = new app.ShelfCollectionView(shelfCollection);
  
  // fetch all the books that belong to 
  // the user, and add them to the right shelf
  hoodie.store.findAll('book').then(function(allBooks) {
    allBooks.forEach(function(book){
      var modelBook = new app.Book(book);
      shelfCollection.forEach(function(shelf){
        if (shelf.get('name') === modelBook.get('shelf')){
          console.log('added %s to %s', modelBook.get('title'), shelf.get('name'));
          shelf.get('nested').add(modelBook);
        }
      });
    });
    shelvesCollectionView.setIndexAsActive(0);
  });
});

// when a book changes, update the UI.
// hoodie.store.on('add:book', readingList.add);
// hoodie.store.on('update:book', readingList.update);
// hoodie.store.on('remove:book', readingList.remove);

// clear book list when user logs out,
// hoodie.account.on('signout', bookCollectionView.collection.reset());

$('#listinput').on('keyup', function(event){
  var val = event.target.value;

  if (event.keyCode === 13){
    // add a shelf
    var shelf = new app.Shelf({ name : val });
    shelvesCollectionView.addShelf(shelf);
    hoodie.store.add('shelf', shelf.toJSON());
  }
});

// search for a new book
$('#bookinput').on('keyup', $.debounce(function(event) {
  var stillTyping = true;
  var val = event.target.value;

  // Be nice to the search
  if (val.length >= 3){
    $('#loading').show();
    hoodie.isbn.searchbooks({
      query: val
    }).fail(function(){
      $('#loading').hide();
    }).done(function(search){
      $('#loading').hide();
      searchResultsView.reset();
      searchResultsView.collection.set(search.result.data);
    });
  }
}, 555));

// check if the user is linked to goodreads.
// this is still buggy probably.
$(document).ready(function(){
  hoodie.goodreads.getinfo({username: hoodie.account.username}).fail(function(){
    $('#linkToGoodreads').show();
  }).done(function(data){
    if (data.goodreads_exists){
      $('#linkedToGoodreads').show();
    } else {
      $('#linkToGoodreads').show();
    }
  });

  var href = $('#linkToGoodreads').attr('href');
  $('#linkToGoodreads').attr('href',
                             href + '?hoodie_id=' + hoodie.account.username);
});
var app = app || {};

app.BookCollection = Backbone.Collection.extend({
  model: app.Book
});
var app = app || {};

app.SearchResults = Backbone.Collection.extend({
  model: app.Book
});
var app = app || {};

app.ShelfCollection = Backbone.Collection.extend({
  model: app.Shelf,
  initialize: function(){
      this.on('setactive', this.setActive);
  },
  setActive: function(model){
    // only one shelf can be set to active at a 
    // time.
    this.models.forEach(function( item ){
      if (item.get('name') === model.get('name')){
        item.set('active', true);
        app.pubSub
          .trigger('viewingNewShelf', item.get('nested'));
      } else {
        item.set('active', false);
      }
      app.pubSub.trigger('renderShelves');
    });
  }
});
var app = app || {};

app.Book = Backbone.Model.extend({
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
var app = app || {};

app.Shelf = Backbone.Model.extend({
  defaults: {
    name: ''
  },
  initialize: function(options){
    this.set('name', options.name);
    this.set('nested', options.collection || new app.BookCollection());
    app.pubSub.on('add:shelf', this.addBookToShelf, this);
    app.pubSub.on('remove:shelf', this.removeBookFromShelf, this);
  },
  setActive: function(val){
    // the active status of model is actually 
    // dependent on the collection the model is in
    this.trigger('setactive', this);
  },
  addBookToShelf: function(book){
    if (this.get('active')){
      book.set('shelf', this.get('name'));

      this.get('nested').add(book);

      // The below probably needs to be moved
      // to a sync routine
      hoodie.store.add('book', book.toJSON()).then(function(object){
        book.set('id', object.id);
      });
    }
  },
  removeBookFromShelf: function(book){
    var that = this;
    if (that.get('active')){
      hoodie.store.remove('book', book.get('id'))
        .then(function(){
          that.get('nested').remove(book);

      });
    }
  }
});

var app = app || {};

app.BookView = Backbone.View.extend({
  tagName: 'li',
  bookTpl: _.template($("#reading-list-item-template").html()),
  events: {
    'click i.remove': 'deleteBook',
  },
  initialize: function(options){
    this.options = options || {};
  },
  render: function(){
    this.$el.html( this.bookTpl(this.model.toJSON()));
    return this;
  },
  deleteBook: function(){
    this.remove();
    // this.model.delete();
    console.log('deleting the book');
    app.pubSub.trigger('remove:shelf', this.model);

    // console.log(this.model.get('id'));
    
  }
});
var app = app || {};

app.BookCollectionView = Backbone.View.extend({
  el: '#booklist',
  initialize: function(initialBooks){
    this.collection = []
    this.collection = new app.BookCollection(initialBooks);
    this.render();
    app.pubSub
      .on('viewingNewShelf', this.setBookCollection, this);
  },
  render: function(){
    this.$el.html('');
    this.collection.forEach(function( item ){
      this.renderBook(item);
    }, this);
  },
  renderBook: function(item){
    var bookView = new app.BookView({ model: item });
    this.$el.append(bookView.render().el);
  },
  setBookCollection: function(collection){
    console.log('collection: ', collection);
    this.collection = collection;
    this.collection.on('add', this.render, this);
    this.render();
  }
});
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
var app = app || {};

app.SearchResultsView = Backbone.View.extend({
  el: '#searchresults',
  initialize: function(searchResults){
    this.collection = new app.BookCollection(searchResults);
    this.render();
    this.listenTo( this.collection, 'add', this.renderBook );
  },
  reset: function(){
    this.$el.html('');
    this.collection.reset();
  },
  render: function(){
    this.collection.each(function( item ){
      this.renderBook(item);
    }, this);
  },
  renderBook: function( item ){
    var searchResultView = new app.SearchResultView({ model: item });
    this.$el.append(searchResultView.render().el);
  }
});
var app = app || {};

app.ShelfView = Backbone.View.extend({
  tagName: 'li',
  attributes : function () {
    return {
      class : this.model.get('active') ? 'active' : '',
    };
  },
  shelfTpl: _.template($("#shelf-list-item-template").html()),
  events: {
    'click': 'view'
  },
  initialize: function(){
    // this.model.on('change:active', this.setCollection, this);
  },
  render: function(){
    this.$el.html( this.shelfTpl(this.model.toJSON()));
    return this;
  },
  view: function( event ){
    this.model.setActive(true);
  }
});
var app = app || {};

app.ShelfCollectionView = Backbone.View.extend({
  el: '#shelflist',
  initialize: function(collection){
    this.collection = collection;
    this.render();
    app.pubSub.on('renderShelves', this.render, this);
  },
  render: function(){
    this.$el.html('');
    this.collection.each(function( item ){
      this.renderShelf(item);
    }, this);
  },
  renderShelf: function( item ){
    var shelfView = new app.ShelfView({ model: item });
    this.$el.append(shelfView.render().el);
  },
  addShelf: function( shelf ){
    this.collection.add(shelf);
    this.render();
  },
  setIndexAsActive: function( index ){
    this.collection.models[index].setActive(true);
    this.render();
  }
});