import {LayoutView} from 'backbone.marionette';
import template from './template.hbs';
import {Model} from 'backbone';

export default LayoutView.extend({
  template: template,

  regions:{
  	breadcrumb:'#breadcrumb',
  	content:'.post_content'
  },

  className: 'post',
  
  initialize(options = {}){
  	this.model = options.model;
  }
});
