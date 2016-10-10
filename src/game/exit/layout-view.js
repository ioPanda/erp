import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import $ from 'jquery';
import Backbone from 'backbone';
import confirmView from '../../component/modal/service';
import {history} from 'backbone';

export default ItemView.extend({
  template: template,
  className: 'exit',

  initialize(options={}){
  	Backbone.on('exit',this.exitFun,this);
  	Backbone.trigger('exit');
  },

  exitFun () {
  	console.log("!");
    confirmView.request(
    	'confirm',
    	{
    		title:"退出游戏",
    		text:"确定退出游戏"
    	}
    ).then((res) =>{
    	if(res){
    		console.log(1);
    		history.navigate("group",{trigger:true});
    	}else{
    		console.log(2);
        history.go(-1);
    	}
    });
  }

});
