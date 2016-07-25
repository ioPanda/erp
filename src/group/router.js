import Backbone from 'backbone';
import createRoute from './create/route';

export default Backbone.Router.extend({
  initialize(options = {}) {
    this.container = options.container;
    this.on('before:enter', this.onBeforeEnter);
  },

  onBeforeEnter() {
    console.log('login/main');
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
