import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import $ from 'jquery';
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
        console.log(1);
    },
    
    append (model) {
        console.log(model);
        this.collection.add(model);
        // console.log(this.collection);
        // console.log(this.collection);
        // this.collection.listenTo('add', this.serializeData);
    },

    serializeData () {
        console.log(this.collection.models);
    	return {
    		"developingMarket": this.collection.models//[0].get('developingMarket')
    	}
        // console.log(this.collection.models)
        // return {
            // "developingMarket": this.collection.models
        // }
    },

    ui:{
        stopRes:'.stopRes',
        content:'._content'
    },

    events:{
        'mouseover @ui.stopRes':'moveIn',
        'mouseout @ui.stopRes':'moveOut',
        'click @ui.stopRes':'stopResFun'
    },

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

    stopResFun (e) {
        let $this = $(e.target),
            // console.log($text);
            $text = $this.text(),
            $statu = $this.prev().find('.status').find('h3'),
            statu = $statu.text();
            // console.log(statu);
        if($text == '暂停开拓' && statu == '正在开拓'){
            $this.text('进行开拓');
            $statu.text('暂停开拓');
            //ajax
        }else if($text == '进行开拓' && statu == '暂停开拓'){
            $this.text('暂停开拓');
            $statu.text('正在开拓');
            //ajax
        }
    }


    
});