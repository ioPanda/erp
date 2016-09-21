import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import $ from 'jquery';
import Backbone from 'backbone';
import Util from '../../../util.js';

export default ItemView.extend({
  template: template,
  className: 'checked_content',

  ui:{
  	select:"select option",	
  	submit:"button"
  },

  events:{
    
  	"click @ui.submit":"link"

  },
  
  link (e) {
    let $marketName=$('option:checked').text();
    Backbone.trigger('selectMkt',$marketName);//触发图片数据确认事件
    // Util.ajax('POST','/erp/market/findPrediction.do',);
  }

});
