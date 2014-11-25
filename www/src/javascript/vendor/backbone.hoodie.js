var Backbone = require('backbone');

Backbone.sync = function(method, model, options) {
  var promise;
  switch (method) {
    case 'read':
    if (model.id) {
      promise = hoodie.store.find(model.type, model.id);
    } else {
      promise = hoodie.store.findAll(model.model.prototype.type);
    }
    break;
    case 'create':
    promise = hoodie.store.add(model.type, model.attributes);
    break;
    case 'update':
    promise = hoodie.store.update(model.type, model.id, model.attributes);
    break;
    case 'delete':
    promise = hoodie.store.remove(model.type, model.id);
    break;
    default:
    throw new Error("not implemented");
  }
  if (options.success) promise.done(options.success);
  if (options.error) promise.fail(options.error);
  return promise;
};
