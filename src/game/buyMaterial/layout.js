import {LayoutView} from 'backbone.marionette';
import template from './template.hbs';

export default LayoutView.extend({
  template: template,
  className:'.buy',
  regions:{
  	breadcrumb:"#breadcrumb",
  	content:"#content"
  }
});
