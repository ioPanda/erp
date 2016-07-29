import Backbone from 'backbone';
import createRoute from './create/route';
import Aside from '../component/aside/service';

export default Backbone.Router.extend({
  initialize(options = {}) {
    this.container = options.container;
    this.listenTo(this, 'before:enter', this.onBeforeEnter);
    // this.on('before:enter', this.onBeforeEnter);
    Aside.show('group');
  },

  onBeforeEnter() {
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
