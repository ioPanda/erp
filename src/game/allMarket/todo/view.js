import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import $ from 'jquery';


export default ItemView.extend({
	template:template,
    className:'_content',

    initialize(options={}){
    	this.collection=options.collection;
    },
    
    //返回渲染数据
    serializeData () {
    	return {
    		"unDevelopMarket":this.collection.models[0].get('unDevelopMarket')
    	}
    },

    ui:{
        startRes:'.startRes'
    },

    events:{
        'mouseover @ui.startRes':'moveIn',
        'mouseout @ui.startRes':'moveOut',
        'click @ui.startRes':'todo'
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

    todo (e) {
        
    }

});