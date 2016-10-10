import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import $ from 'jquery';
import _ from 'lodash';
import Backbone from 'backbone';
import Util from '../../../util.js';

export default ItemView.extend({
	template:template,
    className:'_content',

    initialize(options={}){
        this.collection=options.collection;
        Backbone.on('append',this.append,this);
        this.listenTo(this.collection, 'add', this.changeRneder);
    },

    changeRneder () {
        this.render();
        
    },
    
    append (model) {
        this.collection.add(model);
    },

    serializeData () {
    	return {
    		"developingMarket": _.invoke(this.collection, 'toJSON')
    	}
    },

    ui:{
        stopRes:'.stopRes',
        content:'._content'
    },

    events:{
        'click @ui.stopRes':'stopResFun'
    },



    stopResFun (e) {
        let $this = $(e.target),
            $text = $this.text(),
            $statu = $this.prev().find('.statu').find('h3'),
            statu = $statu.text(),
            marketName = $this.prev().find('.Name').find('h3').text();
        let m = {"marketName":marketName};
        if($text == '暂停开拓' && statu == '正在开拓'){
            $this.text('进行开拓');
            $statu.text('暂停开拓');
            Util.ajax('POST','/erp/market/stopDevelopingMarket.do',m)
                .then((res) => {
                    if(res.statu == 1){
                        console.log(res.message);
                    }else{
                        console.log(res.message);
                    }
                });
        }else if($text == '进行开拓' && statu == '暂停开拓'){
            $this.text('暂停开拓');
            $statu.text('正在开拓');
            Util.ajax('POST','/erp/market/startDevelopingMarket.do',{'marketName':marketName})
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