import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import $ from 'jquery';


export default ItemView.extend({
	template:template,
    className:'_content',

    initialize(options={}){
        this.collection=options.collection;
    },

    serializeData () {
    	return {
    		"developingMarket":this.collection.models[0].get('developingMarket')
    	}
    },

    ui:{
        stopRes:'.stopRes'
    },

    events:{
        'mouseover @ui.stopRes':'moveIn',
        'mouseout @ui.stopRes':'moveOut'
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
    }
});