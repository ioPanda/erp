/*import Backbone from 'backbone';
import $ from 'jquery';
Backbone.$ = $;
import Marionette from 'backbone.marionette';
import 'bootstrap';
import 'backbone.syphon';
import 'backbone-query-parameters';
import 'babel-polyfill';*/


// start the marionette inspector
/*if (window.__agent) {
  window.__agent.start(Backbone, Marionette);
}*/

var Handlebars = require("hbsfy/runtime");

Handlebars.registerHelper('marketN', function (marketName) {
	console.log(marketName);
	return marketName;
});
