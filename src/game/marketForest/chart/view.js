import {ItemView} from 'backbone.marionette';
import template from './template.hbs';

export default ItemView.extend({
  template: template,
  className: 'request_content',
  
  initialize(options={}){
  	this.colletion=options.colletion;
  	
  }
});