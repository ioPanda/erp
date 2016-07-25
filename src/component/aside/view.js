
import _ from 'lodash';
import {history} from 'backbone';
import {ItemView} from 'backbone.marionette';
import template from './template.hbs';

export default ItemView.extend({
  template: template,
  className: 'sidebar',

  attributes: {
    role: 'sidebar'
  },

  templateHelpers() {
    return {
      Menu: _.invoke(this.model, 'toJSON')
    };
  },

  ui: {
    collapse: '#navbar-collapse',
    aside: 'aside',
    mainMenu: '.main-menu',
    wrapper : '#wrapper',
    toggleMenu: '#sizeToggle',
  },

  events: {
    'click #sizeToggle': 'toggleMenu'
  },

  toggleMenu(e) {
    e.preventDefault();
    var width = this.ui.aside.width();
    this.ui.mainMenu.toggleClass('hide');
  },

  onCollapseShow() {
    this.listenToOnce(history, 'route', () => {
      this.ui.collapse.collapse('hide');
    });
  }
});
