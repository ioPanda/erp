import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'lodash';

export default ItemView.extend({
	template:template,
	className:'stepOne',
	initialize(options={}){
		this.step = options.step;
		this.collection = options.collection;
		Backbone.trigger('Step',this.step);
	},

	ui:{
		sure:'.sure'
	},

    events:{
    	"click @ui.sure":"putIntoMoney"
    },


    putIntoMoney (e){
    	let $this = $(e.target),
    		money = $this.parent().prev().find('.putInto').val(),
    		productId = $this.parent().prev().find('.productId').text();
    	console.log(productId,money);

    },

    serializeData () {
  	return  { 
  		"market": _.invoke(this.collection,'toJSON')
  	 }
  }
});