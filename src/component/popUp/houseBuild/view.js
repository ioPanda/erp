import _ from 'lodash';
import {history} from 'backbone';
import {ItemView} from 'backbone.marionette';
import template from './template.hbs';

export default ItemView.extend({
  template: template,
  className: '.house-build'
});