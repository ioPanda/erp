import {ItemView} from 'backbone.marionette';
import template from './item-template.hbs';

export default ItemView.extend({
  tagName: 'option',
  template: template,

  // attributes() {
  //   return {
  //     'data-uid': `#users/${this.model.get('userId')}`
  //   };
  // },

  modelEvents: {
    all: 'render'
  }
});
