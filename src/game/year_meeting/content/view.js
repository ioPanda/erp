import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import $ from 'jquery';
import {Model} from 'backbone'

export default ItemView.extend({
  template: template,
  className: 'article',
  
  ui:{
    detail:'#detail',
    info:'.info'
  },

  events:{
    'mouseover @ui.detail':'onMoveover',
    'mouseout @ui.detail':'onMoveout'
  },
  
  initialize(options={}){
    this.model=new Model(options);
  },

  onMoveover(e){
    var $this=$(e.target);
    var $info=$this.parent().parent().find('.info');
    $info.fadeIn('slow');  
  },

  onMoveout(e){
    var $this=$(e.target);
    var $info=$('.info');
    $info.fadeOut('slow');
  }

});