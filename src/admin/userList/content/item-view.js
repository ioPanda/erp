
import {ItemView} from 'backbone.marionette';
import template from './item-template.hbs';

export default ItemView.extend({
  tagName: 'tr',
  template: template,
  className: 'users__item',
 
  attributes() {
    return {
      'data-uid': `#users/${this.model.get('userId')}`
    };
  },

  modelEvents: {
    all: 'render'
  }
});



