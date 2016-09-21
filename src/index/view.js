import {ItemView} from 'backbone.marionette';
import template from './template.hbs';

export default ItemView.extend({
  template: template,
  className: 'index',
  serializeData () {
  	return [{name:'111'},{name:'222'},{name:'333'}];
  }
});
