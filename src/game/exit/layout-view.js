import {LayoutView} from 'backbone.marionette';
import template from './template.hbs';
import $ from 'jquery';

export default LayoutView.extend({
  template: template,
  className: 'exit',

  regions:{
  	screen:'#screen',
  	alert:'#alert'
  }

});
