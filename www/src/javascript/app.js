// var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
global.jQuery = $

global.pubSub = _.extend({}, Backbone.Events);

global.hoodie  = new Hoodie();

var debounce = require('./vendor/jquery-debounce');
var BookCollection = require('./collections/book_collection');
var ShelfCollection = require('./collections/shelf_collection');
var Book = require('./models/book');
var Shelf = require('./models/shelf');
var BookView = require('./views/book');
var BookCollectionView = require('./views/book_collection');
var ShelfCollectionView = require('./views/shelf_collection');
var SearchResultsView = require('./views/search_results');
var MarkAsReadView = require('./views/mark_as_read');
var HoodieAccountBar = require('./views/hoodie_account_bar');


// // The only thing that should be in a DOMReady
$(function() {
  // initialize Hoodie
  
  
  // var app = app || {};

  // create a publisher subscriber model
  

  // Instantiate main book collection view.
  var bookCollectionView = new BookCollectionView();

  // Instantiate search results.
  var searchResultsView = new SearchResultsView();

  // initial load of all book items from the store

  var markAsRead = new MarkAsReadView();
  var hoodieAccountBar = new HoodieAccountBar();
  var shelfCollection;
  var shelvesCollectionView;

  hoodie.store.findAll('shelf').then(function(allShelves){
    shelfCollection = new ShelfCollection(allShelves);
    var otherShelf = shelfCollection.add({
      name: 'other'
    });
    shelvesCollectionView = new ShelfCollectionView(shelfCollection);
    
    // fetch all the books that belong to 
    // the user, and add them to the right shelf
    hoodie.store.findAll('book').then(function(allBooks) {
      allBooks.forEach(function(book){
        var modelBook = new Book(book);
        var onShelf = false;
        shelfCollection.forEach(function(shelf){
          if (shelf.get('name') === modelBook.get('shelf')){
            shelf.get('nested').add(modelBook);
            onShelf = true;
          }
        });
        if (! onShelf){
          shelfCollection.get(otherShelf.cid).get('nested').add(modelBook);
        }
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
      var shelf = new Shelf({ name : val });
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
    hoodie.goodreads.getinfo({username: hoodie.account.username})
    .fail(function(){
      $('#linkToGoodreads').show();
    })
    .done(function(data){
      if (data.goodreads_exists){
        $('#linkedToGoodreads').show();
      } else {
        $('#linkToGoodreads').css('display', 'inline-block');
      }
    });

    var href = $('#linkToGoodreads').attr('href');
    $('#linkToGoodreads').attr('href',
                               href + '?hoodie_id=' + hoodie.account.username);
  });

});
