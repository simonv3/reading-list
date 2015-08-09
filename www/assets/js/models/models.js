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
  name: null,
  dateAdded: null,
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
  notes: null,
  isbn10: null,
  rating: null,
  readDates: new models.ReadDateCollection(),
  tags: new models.TagCollection(),
  links: new models.LinkCollection(),
});

models.BookCollection = hoodie.backbone.Collection.extend({
  model: models.BookModel
});

module.exports = models;
