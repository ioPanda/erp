import {LayoutView} from 'backbone.marionette';
import template from './template.hbs';
import {Model} from 'backbone';

export default LayoutView.extend({
	template: template,
    
    regions:{
    	dlped:'#developed',
    	dlping:'#developing',
    	nodlp:'#not-developing'
    },
    
    initialize(options={}){
	    this.model=options.model;
    }  
});