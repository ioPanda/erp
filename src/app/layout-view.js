import {LayoutView} from 'backbone.marionette';
import template from './layout-template.hbs';

export default LayoutView.extend({
  el: '.application',
  template: template,

  regions: {
    header  : '.application__header',
    aside   : '.application__aside',
    content : '.application__content',
    overlay : '.application__overlay'
  }
});
