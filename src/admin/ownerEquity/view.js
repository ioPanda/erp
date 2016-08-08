import $ from 'jquery';
import {ItemView} from 'backbone.marionette';
import template from './template.hbs';

export default ItemView.extend({
	el: '.ownerEquity',

	ui: {
		companyLink: '#navbar li:first',
		gameGroupLink: '#navbar li:last',
		companyView: '#companyView',
		gameGroupView: '#gameGroupView'
	},

    events: {
    	'click @ui.companyLink': 'gameGroupLink',
    	'click @ui.gameGroupLink': 'gameGroupLink'
    },

    gameGroupLink(e){
    	e.preventDefault();
        
        alert("ui");
    }
});