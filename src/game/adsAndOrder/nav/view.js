import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import Backbone from 'backbone';
import $ from 'jquery';

export default ItemView.extend({
	template:template,
	className:'ads-nav',
    initialize(options={}){
    	Backbone.on('Step',this.stepFun,this);
    },
    classNameArr(OneClass,TwoClass,tOneClass,tTwoClass,thOneClass){
    	let Arr = [],
    		i,
    		len = arguments.length;
    	for( i = 0;i < len; i++){
    		Arr.push(arguments[i]);
    	}
    	return Arr;
    },


    One (objOne,objTwo,classList,step) {
    	objOne.eq(step-1).addClass(classList[0]);
    	objTwo.eq(step-1).addClass(classList[1]);
    },

    Two (objOne,objTwo,classList,step){
    	this.One(objOne,objTwo,classList,step);
    	objOne.eq(step-2).addClass(classList[2]);
    	objTwo.eq(step-2).addClass(classList[3]);
    },

    More (objOne,objTwo,classList,step){
    	this.Two(objOne,objTwo,classList,step);
    	while(step >= 3) {
    		objOne.eq(step-3).addClass(classList[4]);
    		objTwo.eq(step-3).addClass(classList[3]);
    		--step;
    	}
    },

    stepFun(step){
    	let lis = $('#nav').find('li'),
    		spans = lis.find('span'),
    		OneArr = this.classNameArr('active','active1','actived','active2','prev_actived');
    	switch(step){
    		case 1:
    			this.One(lis,spans,OneArr,step);
    			break;
    		case 2:
    			this.Two(lis,spans,OneArr,step);
    			break;
    		case 3:
    			this.More(lis,spans,OneArr,step);
    			break;
    		case 4:
    			this.More(lis,spans,OneArr,step);
    			break;
    		case 5:
    			this.More(lis,spans,OneArr,step);
    			break;
    		default :
    			break;
    	}	
    }



});