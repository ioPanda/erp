import Backbone from 'backbone';
import IndexRoute from './route';

export default Backbone.Router.extend({
  initialize(options = {}) {
    this.container = options.container;

    this.listenTo(this, 'before:enter', this.onBeforeEnter);
  },

  /*onBeforeEnter() {
    AsideService.show('admin');
  },*/

  routes: {
    '': 'index'
  },

  index() {
    return new IndexRoute({
      container: this.container
    });
  }
});
