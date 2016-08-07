import {LayoutView} from 'backbone.marionette';
import template from './template.hbs';


export default LayoutView.extend({
  template: template,

  regions: {
  	breadcrumb: '#breadcrumb',
  	content: '.content'
  },
  
  className: 'year_meeting',
  
  initialize(options = {}) {
    this.model = options.model;
  }
  
  ui:{
	  link:'#link',
	  info:'#info-display'
  },

  events:{
  	'moveover #link':'onMoveover',
  	'moveout #link':'onMoveout'
  },

  onMoveover(){
	  $("#info-display").show();
  },

  onMoveout(){
	  $("#info-display").hide();
  }
});
