import Marionette from 'backbone.marionette';
import View from './view';
import Model from './model';
import Util from '../../util';
import {history} from 'backbone';
import nprogress from 'nprogress';

export default Marionette.Object.extend({
  initialize(options = {}) {
    this.container = options.container;

    this.model = new Model();
    this.view = new View({ model: this.model});
    this.container.show(this.view);

    this.listenTo(this.model, 'change', this.onModelChange);
  },

  onModelChange() {
    // ..
  }
});
