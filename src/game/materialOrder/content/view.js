import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import $ from 'jquery';
import {Model} from 'backbone';

export default ItemView.extend({
  template: template,
  
  className: 'material_content',
  
  initialize(options = {}) {
    this.model = options.model;
  },
  ui:{
  	pagesone:"#pagesone",
  	pagestwo:"#pagestwo",
  	pagesthree:"#pagesthree"
  }

});
