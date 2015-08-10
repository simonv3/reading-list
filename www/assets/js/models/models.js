var hoodie = new Hoodie();

var models = {};

models.ReadDateModel = hoodie.backbone.Model.extend({
  type: 'read-date',
  dateStarted: null,
  progress: 0,
  dateEnded: null
});

models.ReadDateCollection = hoodie.backbone.Collection.extend({
  model: models.ReadDateModel
});

models.TagModel = hoodie.backbone.Model.extend({
  type: 'tag',
  defaults: {
    name: null,
    dateAdded: moment(),
  }
});

models.TagCollection = hoodie.backbone.Collection.extend({
  model: models.TagModel
});

models.LinkModel = hoodie.backbone.Model.extend({
  type: 'link',
  name: null,
  url: null,
  dateAdded: null,
});

models.LinkCollection = hoodie.backbone.Collection.extend({
  model: models.LinkModel
});

models.BookModel = hoodie.backbone.Model.extend({
  type: 'book',
  defaults: {
    notes: null,
    isbn10: null,
    isbn13: null,
    rating: null,
    authors: null,
    title: '',
    tags: new models.TagCollection(),
    readDates: new models.ReadDateCollection(),
    links: new models.LinkCollection()
  }
  // constructor: function() {
  //   this.readDates = new models.ReadDateCollection();
  //   this.tags = new models.TagCollection();
  //   this.links = new models.LinkCollection();
  //   Backbone.Model.apply(this, arguments);
  // }

});

models.BookCollection = hoodie.backbone.Collection.extend({
  model: models.BookModel
});

module.exports = models;
