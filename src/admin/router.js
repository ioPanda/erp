import Backbone from 'backbone';

export default Backbone.Router.extend({
  initialize(options = {}) {
    this.container = options.container;
  }
});
