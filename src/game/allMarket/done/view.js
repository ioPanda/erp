import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import $ from 'jquery';

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
    		"developedMarket": this.collection.models[0].get('developedMarket')
    	}
    },

    ui:{
        stopSer:'.stopSer'
    },

    events:{
        'mouseover @ui.stopSer':'moveIn',
        'mouseout @ui.stopSer':'moveOut'
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