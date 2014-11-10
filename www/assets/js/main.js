'use strict';
// initialize Hoodie
var hoodie  = new Hoodie();

function SearchResults($element) {
  var collection = [];
  var $el = $element;
  var that = this;

  $el.on('click', 'li', function() {
    var isbn10 = $(this).data('isbn10');
    var isbn13 = $(this).data('isbn13');
    var author = $(this).data('author');
    var title = $(this).data('title');
    hoodie.store.add('book', {
      title: title,
      isbn10: isbn10,
      isbn13: isbn13,
      author: author
    });
    that.clear();
    return false;
  });

  this.setResults = function(results){
    collection = results;
    paint();
  };

  this.clear = function(){
    collection = [];
    paint();
  };

  function paint() {
    $el.html('');
    for (var i = 0, len = collection.length; i<len; i++) {
      var authors = '';
      if (collection[i].author_data.length > 0){
        authors = collection[i].author_data[0].name;
      }
      
      $el.append(
        '<li data-isbn13="' + collection[i].isbn13 +
          '" data-isbn10="' + collection[i].isbn10 +
          '" data-author="' + authors +
          '" data-title="' + collection[i].title +
          '"><span>' +
          collection[i].title + ' by ' + authors +
          '</span>' +
        '</li>'
      );
    }
  }
}

function ReadingList($element) {
  var collection = [];
  var $el = $element;

  // Interact with the items on the list.
  $el.on('click', 'i.remove', function() {
    console.log('hi');
    hoodie.store.remove('book', $(this).parent().data('id'));
    return false;
  });

  // Handle "inline editing" of a todo.
  // $el.on('click', 'label', function() {
  //   $(this).parent().parent().find('.editing').removeClass('editing');
  //   $(this).parent().addClass('editing');
  //   return false;
  // });

  // Handle updating of an "inline edited" todo.
  // $el.on('keypress', 'input[type=text]', function(event) {
  //   if (event.keyCode === 13) {
  //     hoodie.store.update('book', $(this).parent().data('id'), {
  //       title: event.target.value
  //     });
  //   }
  // });

  this.add = function(book) {
    collection.push(book);
    paint();
  };

  // this.update = function(book) {
  //   collection[getBookItemIndexById(book.id)] = book;
  //   paint();
  // };

  this.remove = function(book) {
    collection.splice(getBookItemIndexById(book.id), 1);
    paint();
  };

  this.clear = function() {
    collection = [];
    paint();
  };

  // Find index/position of a todo in collection.
  function getBookItemIndexById(id) {
    for (var i = 0, len = collection.length; i < len; i++) {
      if (collection[i].id === id) {
        return i;
      }
    }
    return null;
  }

  function paint() {
    $el.html('');
    collection.sort(function(a, b) {
      return ( a.createdAt > b.createdAt ) ? 1 : -1;
    });
    for (var i = 0, len = collection.length; i<len; i++) {
      $el.append(
        '<li data-id="' + collection[i].id + '">' +
          '<input type="checkbox"> <label>' + collection[i].title +
          ' by ' + collection[i].author + '</label>' +
          ' <i class="fa fa-trash remove"></i>' +
        '</li>'
      );
    }
  }
}

// Instantiate readinglist collection & view.
var readingList = new ReadingList($('#readinglist'));
// Instantiate search results.
var searchResults = new SearchResults($('#searchresults'));

// initial load of all book items from the store
hoodie.store.findAll('book').then(function(allBooks) {
  allBooks.forEach(readingList.add);
});

// when a book changes, update the UI.
hoodie.store.on('add:book', readingList.add);
hoodie.store.on('update:book', readingList.update);
hoodie.store.on('remove:book', readingList.remove);
// clear todos when user logs out,
hoodie.account.on('signout', readingList.clear);


// handle creating a new task
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
      searchResults.setResults(search.result.data);
    });
  }
  // ENTER & non-empty.
  if (event.keyCode === 13 && event.target.value.length) {
    hoodie.store.add('book', {
      title: val
    });
    val = '';
  }
}, 300));
