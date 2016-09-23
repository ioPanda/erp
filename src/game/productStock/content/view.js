import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import $ from 'jquery';

export default ItemView.extend({
  template: template,
  className: 'cont',
    
  initialize(options={}){
    this.container = options.container;
  }

});