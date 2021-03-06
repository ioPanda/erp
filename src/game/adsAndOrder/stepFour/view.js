import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import Backbone from 'backbone';
import Util from '../../../util.js';
import $ from 'jquery';

export default ItemView.extend({
	template:template,
	className:'stepFour',
	initialize(options={}){
		this.step = options.step;
		this.model = [];
		Backbone.on('req',this.reqFun,this);
		Backbone.trigger('Step',this.step);
		Backbone.trigger('req');
	},

	reqFun () {

		Util.ajax(
			'POST',
			'/erp/chooseOrder/chooseOrderList.do',
			{
				"marketName":"本地市场",
			 	"productName":"P1"
			}
		)
		.then((res) => {
			if(res.status == 1){
				this.model= res.chooseOrders;
				console.log(this.model);
				this.changeRender();
			}else{
				console.log(res.message);
			}
		});
	},

    serializeData () {
    	return {
    		"orderList":this.model
    	}
    },

    changeRender () {
    	this.render();
    },

    ui:{
    	screen: 'form .screen',
    	legend: 'from #leg'

    },

    events:{
    	"click @ui.legend":"hide"
    	// "mouseout @ui.legend":"hide"
    },

    show (e) {
    	let $target = $(e.target).next();
    	target.show();
    },

    hide (e) {
    	let $target = $(e.target).next();
    	target.hide();
    }

});