import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import $ from 'jquery';
import _ from 'lodash';

export default ItemView.extend({
	template:template,
    className:'_content',

    initialize(options={}){
    	this.collection=options.collection;
    	// let coll = this.collection.models[0].get('developedMarket');
        console.log(__dirname);
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
        'mouseover @ui.stopSer':'moveIn',
        'mouseout @ui.stopSer':'moveOut',
        'click @ui.stopSer':'stopSerFun'
    },
// moveIn & moveOut -> css, do not use js
    moveIn (e) {
        let $this=$(e.target);
        $this.css({'background-color':'pink',
                   'font-size':'20px'});
    },
    
    moveOut (e) {
        let $this=$(e.target);
        $this.css({'background-color':'#dbdad6',
                   'font-size':'18px'}); 
    },

    stopSerFun (e) {
        let $this = $(e.target),
            $text = $this.text(),
            $statu = $this.prev().find('.status').find('h3'),
            statu = $statu.text();
            // console.log(statu);
        if($text == '暂停维护' && statu == '正在维护'){
            $this.text('进行维护');
            $statu.text('暂停维护');
            //ajax
        }else if($text == '进行维护' && statu == '暂停维护'){
            $this.text('暂停维护');
            $statu.text('正在维护');
            //ajax
        }
    }

});