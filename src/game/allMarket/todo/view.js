import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import $ from 'jquery';


export default ItemView.extend({
	template:template,
    className:'_content',

    initialize(options={}){
    	this.collection=options.collection;
    },
    
    //返回渲染数据
    serializeData () {
    	return {
    		"unDevelopMarket":this.collection.models[0].get('unDevelopMarket')
    	}
    },

});