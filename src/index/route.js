import {Route} from 'backbone-routing';
import View from './view';

export default Route.extend({
  initialize(options = {}) {
    this.container = options.container;

    this.view = new View();
    this.container.show(this.view);
  }
});
