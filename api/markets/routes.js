var Backbone = require('backbone');
var markets=require('./markets');


module.exports = function (api){
	api.route('/yangqing.do')
	.get(function(req, res){
        res.json(markets);
	})
} 