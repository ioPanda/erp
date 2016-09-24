import {LayoutView} from 'backbone.marionette';
import template from './template.hbs';
import {Model} from 'backbone';

export default LayoutView.extend({
  template: template,

  regions:{
  	breadcrumb:'#breadcrumb',
  	content:'.loanM_content'
  },

  className: 'loanM',
  
  initialize(options = {}){
  	this.model = options.model;
  }
});