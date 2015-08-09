var hoodie = new Hoodie();

var ReadDateModel = hoodie.backbone.Model.extend({
  type: 'read-date',
  dateStarted: null,
  progress: 0,
  dateEnded: null
});

var ReadDateCollection = hoodie.backbone.Collection.extend({
  model: ReadDateModel
});

var TagModel = hoodie.backbone.Model.extend({
  type: 'tag',
  name: null,
  dateAdded: null,
});

var TagCollection = hoodie.backbone.Collection.extend({
  model: TagModel
});

var LinkModel = hoodie.backbone.Model.extend({
  type: 'link',
  name: null,
  url: null,
  dateAdded: null,
});

var LinkCollection = hoodie.backbone.Collection.extend({
  model: LinkModel
});

var BookModel = hoodie.backbone.Model.extend({
  type: 'book',
  notes: null,
  isbn10: null,
  rating: null,
  readDates: new ReadDateCollection(),
  tags: new TagCollection(),
  links: new LinkCollection(),
});

var BookCollection = hoodie.backbone.Collection.extend({
  model: BookModel
});
