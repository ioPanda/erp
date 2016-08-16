import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import $ from 'jquery';


export default ItemView.extend({
	template:template,
    className:'_content',

    initialize(options={}){
        this.collection=options.collection;
    },

    serializeData () {
    	return {
    		"developingMarket":this.collection.models[0].get('developingMarket')
    	}
    }
});