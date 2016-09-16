import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import $ from 'jquery';
import _ from 'lodash';

export default ItemView.extend({
	template:template,
    className:'_content',

    initialize(options={}){
    	this.collection=options.collection;
    },
    
    serializeData() {
    	return {
    		"developedMarket": _.invoke(this.collection, 'toJSON')
    	}
    },

    ui:{
        stopSer:'.stopSer'
    },

    events:{
        'click @ui.stopSer':'stopSerFun'
    },

    stopSerFun (e) {
        let $this = $(e.target),
            $text = $this.text(),
            $statu = $this.prev().find('.statu').find('h3'),
            statu = $statu.text();
        if($text == '暂停维护' && statu == '正在维护'){
            $this.text('进行维护');
            $statu.text('暂停维护');
            //ajax--stopDevelopedMarket
        }else if($text == '进行维护' && statu == '暂停维护'){
            $this.text('暂停维护');
            $statu.text('正在维护');
            //ajax--startDevelopedMarket
        }
    }

});