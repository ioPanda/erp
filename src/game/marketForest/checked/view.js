import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import $ from 'jquery';
import _ from 'lodash';
import Backbone from 'backbone';
import Util from '../../../util.js';

export default ItemView.extend({
  template: template,
  className: 'checked_content',

  initialize (options={}) {
    this.container = options.container;
    this.collection = options.collection;
  },

  serializeData () {
    return {
      "markets":_.invoke(this.collection,"toJSON")
    }
  },

  ui:{
  	select:"select option",	
  	submit:"button"
  },

  events:{
    
  	"click @ui.submit":"link"

  },
  
  link (e) {
    let $marketName=$('option:checked').text();
    Util.ajax('POST','/erp/market/findPrediction.do',{"marketName":$marketName})
        .then((res) => {
          console.log(res);
        });
  }

});
