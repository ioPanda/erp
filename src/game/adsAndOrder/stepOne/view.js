import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import Backbone from 'backbone';

export default ItemView.extend({
	template:template,
	className:'stepOne',
	initialize(options={}){
		this.step = options.step;
		Backbone.trigger('Step',this.step);
	}

	//ajax--putIntoAdvertisement
});