import Backbone from 'backbone';

export default Backbone.Model.extend({

	url:'/erp/forward/yearAndPeriod.do',

	defaults:{
		userName:'用户名',
		quarter:'0',
		userId:'000',
		year:'0'
	}


});