import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import _ from 'lodash';
import $ from 'jquery';


export default ItemView.extend({
	template:template,
	className:'talk',

	initialize(options={}){
		this.model = options.model;
		this.Id = localStorage.getItem('userID');
		console.log(this.Id);
	},

	ui:{
		inputRegion:'.input',
		showRegion:'.display',
		submit:'.send'
	},

	events:{
		"click @ui.submit":"sendFun",
	},

	sendFun (e) {
	    let $this=$(e.target),
		    $val=$this.prev(),
		    $display=$this.parent().prev(),
		    val=$val.val();
		if(val==''){
			e.preventDefault();
    		$val.attr('placeholder','发送不能为空');
		}else if(val!= ''){
    		$val.attr('placeholder','');
			var display = $display.get(0);
			var itemHtml = display.innerHTML;
			itemHtml +=this.Id+'&nbsp;:&nbsp;&nbsp;'+val+"\n";
			display.innerHTML = itemHtml;
            $val.val('');//clear
            
		}

	}

});