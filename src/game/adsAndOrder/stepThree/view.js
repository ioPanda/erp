import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import Backbone from 'backbone';
import Util from '../../../util.js';
import {history} from 'backbone';

export default ItemView.extend({
	template:template,
	className:'stepThree',
	initialize(options={}){
		this.step = options.step;
		this.model = [];
		Backbone.on('req',this.reqFun,this);
		Backbone.trigger('Step',this.step);//nav sync
		Backbone.trigger('req');
    },

    serializeData () {
    	return {
    		"users":this.model
    	}
    },

    changeRender () {
    	this.render();
    },

    reqFun () {
    	Util.ajax(
    		'POST',
    		' /erp/advertisement/allUserAdvertisementStatus.do',
    		{}
    		)
    	.then((res) =>{
    		if(res.status == 1){
    			if(res.data.length == 1){
    				history.navigate("game/adsAndOrder/step4",{trigger:true});
    			}else if(res.data.length > 1){
    				this.model = res.data;
	    			this.changeRender();
    			}
    		}else{
    			console.log(res.message);
    		}
    	});
    }
	
});