import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import Backbone from 'backbone';
import Collection from './collection';
import Util from '../../../util.js';
import _ from 'lodash';

export default ItemView.extend({
	template:template,
	className:'stepTwo',
	initialize(options={}){
		this.step = options.step;
		this.model = [];
		Backbone.trigger('Step',this.step);
		Backbone.on('check',this.checkFun,this);
		Backbone.trigger('check');
		this.collection = new Collection();
	},
	serializeData () {
		console.log(this.model);
		return {
			"orders": this.model
		}
	},

	changeRender () {
		this.render();
	},

	checkFun () {
		Util.ajax(
			'POST',
			'/erp/advertisement/getAlreadAd.do',
			{}
			)
		.then((res) => {
			if(res.status == 1){
				console.log(res.message);
				this.model = res.data;
				this.changeRender();
			}else{
				console.log(res.message);
			}

		});
	}

});