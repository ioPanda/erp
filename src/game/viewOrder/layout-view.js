
import {LayoutView} from 'backbone.marionette';
import template from './template.hbs';

export default LayoutView.extend({
  template: template,

  regions: {
    breadcrumb: '#breadcrumb',
    content: '.content'
  },
  
  className: 'year_meeting',
  
  initialize(options = {}) {
    this.model = options.model;
  }
});
