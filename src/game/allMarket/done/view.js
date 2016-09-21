import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import $ from 'jquery';
import _ from 'lodash';
import Util from '../../../util.js';

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
            statu = $statu.text(),
            marketName=$this.prev().find('.Name').find('h3').text();
            console.log(marketName);
        if($text == '暂停维护' && statu == '正在维护'){
            $this.text('进行维护');
            $statu.text('暂停维护');
            Util.ajax('POST','/erp/market/stopDevelopedMarket.do',{"marketName":marketName})
                .then((res) => {
                    if(res.statu == 1){
                        console.log(res.message);
                    }else{
                        console.log(res.message);
                    }
                });
        }else if($text == '进行维护' && statu == '暂停维护'){
            $this.text('暂停维护');
            $statu.text('正在维护');
            Util.ajax('POST','/erp/market/startDevelopedMarket.do',{"marketName":marketName})
            .then((res) => {
                if(res.statu == 1){
                        console.log(res.message);
                }else{
                        console.log(res.message);
                }
            });
        }
    }

});