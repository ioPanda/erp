import {LayoutView} from 'backbone.marionette';
import template from './template.hbs';
import {Model} from 'backbone';
import $ from 'jquery';

export default LayoutView.extend({
  template: template,

  regions: {
  	breadcrumb: '#breadcrumb',
  	content: '.content_materiaStock'
  },
  
  className: 'materiaStock',
  
  initialize(options = {}) {
    this.model = options.model;
  }
});
