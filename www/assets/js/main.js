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

function render(tmpl_name, tmpl_data) {
    if ( !render.tmpl_cache ) { 
        render.tmpl_cache = {};
    }

    if ( ! render.tmpl_cache[tmpl_name] ) {
        var tmpl_dir = '/templates';
        var tmpl_url = tmpl_dir + '/' + tmpl_name + '.html';

        var tmpl_string;
        $.ajax({
            url: tmpl_url,
            method: 'GET',
            async: false,
            success: function(data) {
                tmpl_string = data;
            }
        });

        render.tmpl_cache[tmpl_name] = _.template(tmpl_string);
    }

    return render.tmpl_cache[tmpl_name](tmpl_data);
}