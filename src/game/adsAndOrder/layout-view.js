import {LayoutView} from 'backbone.marionette';
import template from './template.hbs';
import {Model} from 'backbone';

export default LayoutView.extend({
		template:template,
		className:'ads',

		regions:{
			breadcrumb:'#breadcrumb',
			content:'.content_ads'
		},
        
        initialize(options={}){
        	this.model=options.model;
        }

	});