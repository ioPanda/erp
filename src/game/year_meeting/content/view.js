import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import $ from 'jquery';

export default ItemView.extend({
  template: template,
  className: 'article',
  
  ui:{
    detail:'#detail',
    info:'.info'
  },

  events:{
    'mouseenter @ui.detail':'onMoveover',
    'mouseleave @ui.detail':'onMoveout'
  },
  
  initialize(options={}){
    this.model=options.model;
    this.model1=options.model1;
    this.data=this.model1.get('data');
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