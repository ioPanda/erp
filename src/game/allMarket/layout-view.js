import {LayoutView} from 'backbone.marionette';
import template from './template.hbs';

export default LayoutView.extend({
  template: template,

  regions: {
  	breadcrumb: '#breadcrumb',
  	done:'#done',
  	doing:'#doing',
  	todo:'#todo'
  },
  
  className: 'allMarket'

});
