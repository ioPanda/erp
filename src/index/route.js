import Marionette from 'backbone.marionette';
import View from './view';

export default Marionette.Object.extend({
  initialize(options = {}) {
    this.container = options.container;

    this.view = new View();
    this.container.show(this.view);
  }
});
