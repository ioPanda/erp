import _ from 'lodash';
import {history} from 'backbone';
import {ItemView} from 'backbone.marionette';
import template from './template.hbs';

export default ItemView.extend({
  template: template,
  tagName: 'nav',
  className: 'header navbar navbar-default navbar-fixed-top',

  attributes: {
    role: 'navigation'
  },

  collectionEvents: {
    all: 'render'
  },

  templateHelpers() {
    return {
      primaryItems   : this.serializeWhere({ type: 'primary' }),
      secondaryItems : this.serializeWhere({ type: 'secondary' })
    };
  },

  serializeWhere(props) {
    return _.invoke(this.collection.findWhere(props), 'toJSON');
  },

  ui: {
    collapse: '#navbar-collapse',
    mainMenu: '.main-menu',
    wrapper : '#wrapper'
  },

  events: {
    'click #sidebarToggle' : 'onToggleSidebar'
  },

  onToggleSidebar() {
    this.ui.wrapper.toggleClass('sidebar-display');
    this.ui.mainMenu.find('.openable').removeClass('open');
    this.ui.mainMenu.find('.submenu').removeAttr('style');
  },

  onCollapseShow() {
    this.listenToOnce(history, 'route', () => {
      this.ui.collapse.collapse('hide');
    });
  }
});