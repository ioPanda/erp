var Backbone = require('backbone');
var markets=require('./maketsForset');

module.exports = function (api){
	api.route('/marketController/findPrediction.do')
	.get(function(req, res){
        res.json(markets);
	})
} 