import {Route} from 'backbone-routing';
import View from './view';
import Model from './model';
import Util from '../../util';

export default Route.extend({
  initialize(options = {}) {
    this.container = options.container;

    this.model = new Model();
    this.view = new View({ model: this.model});
    this.container.show(this.view);

    this.listenTo(this.model, 'change', this.onModelChange);
  },

  onModelChange() {
    // ...
  }
});
