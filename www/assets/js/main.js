'use strict';
// initialize Hoodie
var hoodie  = new Hoodie();

var app = app || {};

// Instantiate main book collection view.
var bookCollectionView;

// Instantiate search results.
var searchResultsView = new app.SearchResultsView();
// var searchResults = new SearchResults($('#searchresults'));

// initial load of all book items from the store
hoodie.store.findAll('book').then(function(allBooks) {
  bookCollectionView = new app.BookCollectionView(allBooks);
});
// when a book changes, update the UI.
// hoodie.store.on('add:book', readingList.add);
// hoodie.store.on('update:book', readingList.update);
// hoodie.store.on('remove:book', readingList.remove);

// clear book list when user logs out,
hoodie.account.on('signout', bookCollectionView.collection.reset());

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
