import {LayoutView} from 'backbone.marionette';
import template from './template.hbs';
import {Model} from 'backbone';

export default LayoutView.extend({
  template: template,

  regions: {
    breadcrumb: '#breadcrumb',
    content: '.produce_content',
    body: 'body'
  },

  className: 'produce',

  initialize(options = {}) {
    this.model = options.model;
  }
});