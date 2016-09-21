import 'bootstrap';
/*import Backbone from 'backbone';
import $ from 'jquery';
Backbone.$ = $;
import Marionette from 'backbone.marionette';
import 'bootstrap';
import 'backbone.syphon';
import 'backbone-query-parameters';
import 'babel-polyfill';


// start the marionette inspector
/*if (window.__agent) {
  window.__agent.start(Backbone, Marionette);
}*/

var Handlebars = require("hbsfy/runtime");

Handlebars.registerHelper('marketN', function (marketName) {
	//console.log(marketName);
	//console.log(__dirname);
	switch (marketName){
	    case '亚洲市场':
		    return 'aisa';
		    break;
		case '区域市场':
			return 'region';
			break;
		case '国际市场':
	        return 'international';
	        break;
	    case '国内市场':
		    return 'demostic';
		    break;
		case '本地市场':
			return 'native';
			break;
		default:
			break;
	};
});

Handlebars.registerHelper('Status',function(status) {
	switch (status){
	    case 1 :
		    return '正在维护';
		    break;
		case 0 :
			return '暂停维护';
			break;
		default:
			break;
	};
});

Handlebars.registerHelper('StatusOne',function(status) {
	switch (status){
	    case 1:
		    return '正在开拓';
		    break;
		case 0:
			return '暂停开拓';
			break;
		default:
			break;
	};
});

Handlebars.registerHelper('lastStatus',function(lastStatus) {
	switch (lastStatus){
	    case 1:
		    return '上期已维护';
		    break;
		case 0:
			return '上期未维护';
			break;
		default:
			break;
	};
});

Handlebars.registerHelper('StatusTwo',function(status) {
	switch (status){
	    case 1 :
		    return '暂停开拓';
		    break;
		case 0 :
			return '进行开拓';
			break;
		default:
			break;
	};
});

Handlebars.registerHelper('StatusThree',function(status) {
	switch (status){
	    case 1 :
		    return '暂停维护';
		    break;
		case 0 :
			return '进行维护';
			break;
		default:
			break;
	};
});

