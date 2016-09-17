var Backbone = require('backbone');
var success = require('./success');

var collection = new Backbone.Collection(success);
var id = collection.length;

module.exports = function(api) {
  api.route('/userManagerController/getUserList.do')
    .get(function(req, res) {
      res.json(collection);
    });
};