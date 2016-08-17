import {LayoutView} from 'backbone.marionette';
import template from './template.hbs';
import {Model} from 'backbone';

export default LayoutView.extend({
		template:template,
		className:'ads',

		regions:{
			breadcrumb:'#breadcrumb',
			nav:'#navStep',
			step:'#step',
			talkRoom:'#talkRoom'
		},
        
        initialize(options={}){
        	this.model=options.model;
        }

	});