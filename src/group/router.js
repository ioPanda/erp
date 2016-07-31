import Backbone from 'backbone';
import {Router} from 'backbone-routing';
import createRoute from './create/route';
import Aside from '../component/aside/service';

export default Router.extend({
  initialize(options = {}) {
    this.container = options.container;

    this.on('before:enter', this.onBeforeEnter);
  },

  onBeforeEnter() {
    Aside.show('group');
    console.log('group');
  },

  routes: {
    'group': 'create',
    'group/create'    : 'create'
  },

  create() {
    return new createRoute({
      container: this.container
    });
  }
});
