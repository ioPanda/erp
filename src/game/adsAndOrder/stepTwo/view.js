import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import Backbone from 'backbone';
import Collection from './collection';

export default ItemView.extend({
	template:template,
	className:'stepTwo',
	initialize(options={}){
		this.step = options.step;
		Backbone.trigger('Step',this.step);
		this.collection = new Collection();
		console.log(this.collection);
	},

    serializeData () {
    	return {

    	}
    }

});