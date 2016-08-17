import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import $ from 'jquery';

export default ItemView.extend({
	template:template,
    className:'_content',

    initialize(options={}){
    	this.collection=options.collection;
    	// let coll = this.collection.models[0].get('developedMarket');
    },
    
    serializeData() {
    	return {
    		"developedMarket": this.collection.models[0].get('developedMarket')
    	}
    }


});