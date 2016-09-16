import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import $ from 'jquery';
import _ from 'lodash';
import Backbone from 'backbone';

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
        console.log(model);
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
            statu = $statu.text();
        if($text == '暂停开拓' && statu == '正在开拓'){
            $this.text('进行开拓');
            $statu.text('暂停开拓');
            //ajax--startDevelopingMarket
            
        }else if($text == '进行开拓' && statu == '暂停开拓'){
            $this.text('暂停开拓');
            $statu.text('正在开拓');
            //ajax--stopDevelopingMarket
        }
    }


    
});