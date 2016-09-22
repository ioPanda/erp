import {LayoutView} from 'backbone.marionette';
import template from './template.hbs';
import {Model} from 'backbone';
import $ from 'jquery';

export default LayoutView.extend({
  template: template,

  regions: {
  	breadcrumb: '#breadcrumb',
  	content: '.content_viewBalance'
  },
  
  className: 'viewBalance',
  
  initialize(options = {}) {
    
  }
});
