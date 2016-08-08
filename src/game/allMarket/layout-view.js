import {LayoutView} from 'backbone.marionette';
import template from './template.hbs';
import {Model} from 'backbone';

export default LayoutView.extend({
  template: template,
  className: 'authenticate',

  regions:{
	  breadcrumb: '#breadcrumb',
  	  content_market: '.content-market'
  },

  initialize(options={}){
  	this.model=options.model;
  }
});
