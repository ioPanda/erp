import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import _ from 'lodash';
import $ from 'jquery';


export default ItemView.extend({
	template:template,
	className:'talk',

	initialize(options={}){
		this.model = options.model;
        // this.name = _.invoke(this.model, 'toJSON');//toJSON json.stringlify
		// _.bindAll(this,'addMessage');
	},

	// serializeData () {
	// 	return {
	// 		"record" :this.name.record
	// 	}
	// },

	ui:{
		inputRegion:'.input',
		showRegion:'.display',
		submit:'.btnSend'
	},

	events:{
		"click @ui.submit":"sendFun",
	},

    
	sendFun (e) {

	    let $this=$(e.target),
		    $val=$this.parent().prev().find('textarea'),
		    str='',
		    screen=$this.parent().prev().prev().find('.screen'),
		    val=$val.val();
		if(val==''){
			e.preventDefault();
        	alert("发送不能为空！");
		}else if(val!= ''){
			screen.append(":" +val+'<br>');
            $val.val("");//clear
            
		}

	}

});