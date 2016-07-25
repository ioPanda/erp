var Backbone = require('backbone');
var success = require('./success');
var failure = require('./failure');

module.exports = function(api) {
  api.route('/api/signinService')
    .post(function(req, res) {
      res.json(success);
      /*if (req.name == 'admin') {
        console.log(req);
        res.json(success);
      } else {
        res.json(failure);
      }*/
    });

  api.route('/api/signupService')
    .post(function(req, res) {
      if (req.name == 'admin' && req.password == 123) {
        res.json(success);
      } else {
        res.json(failure);
      }
    })
};

//var collection = new Backbone.Collection(fixture);

//var id = collection.length;

/*module.exports = function(api) {
  api.route('/login/signinService')
    .get(function(req, res) {
      res.json(collection);
    })
    .post(function(req, res) {
      var model = new Backbone.Model(req.body);
      model.set('id', ++id);
      collection.add(model);
      res.json(model);
    });

  api.route('/api/colors/:id')
    .get(function(req, res) {
      var model = collection.get(req.params.id);
      res.json(model);
    })
    .put(function(req, res) {
      var model = collection.get(req.params.id);
      model.set(req.body);
      res.json(model);
    })
    .delete(function(req, res) {
      var model = collection.get(req.params.id);
      collection.remove(model);
      res.json(collection);
    });
};
*/