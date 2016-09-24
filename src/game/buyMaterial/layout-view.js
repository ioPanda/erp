import {LayoutView} from 'backbone.marionette';
import template from './template.hbs';
import {Model} from 'backbone';

export default LayoutView.extend({
  template: template,
  
  regions:{
  	breadcrumb: '#breadcrumb',
  	content: '.buy_content'
  },
  className: 'buy',
  
  initialize(options = {}) {
    this.model = options.model;
  }
});




