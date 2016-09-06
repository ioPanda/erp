import {LayoutView} from 'backbone.marionette';
import template from './template.hbs';

export default  LayoutView.extend({
       template:template,
       className:'forest',

       regions:{
	       	breadcrumb:"#breadcrumb",
	       	select:'#checked',
	       	chart:'#chart'
       }
       
});