/*
 * init page num
 * click event
 * click callback
 */
import _ from 'lodash';
import {ItemView} from 'backbone.marionette';
import template from './template.hbs';

export default ItemView.extend({
  template: template,

  initialize(options = {}) {
    this.page = options.page;
    this.total = options.total;
    // this.state = { start: 0, limit: 10 };
    // this.state.start = (options.page - 1) * this.state.limit;
  },

  templateHelpers() {
    let total   = this.total;
    let current = this.page;

    let prev = current - 1 > 0 ? current - 1 : false;
    let next = current < total ? current + 1 : false;

    return { total, current, prev, next };
  },

  triggers: {
    'click .btn-primary' : 'confirm',
    'click .close'       : 'cancel'
  }
});