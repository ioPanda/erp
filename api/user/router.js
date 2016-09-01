var Backbone = require('backbone');
var username=require('./username');


module.exports = function (api){
	api.route('/username.do')
	.get(function(req, res){
        res.json(username);
	})
} 