import Marionette from 'backbone.marionette';
import {Collection} from 'backbone';
import Model from './model';
import View from './view';

var Controller = Marionette.Object.extend({
  setup(options = {}) {
    this.container = options.container;
  },

  show(type) {
    //var model = (new Model).get(type);
    var model = new Model();
    this.model = model;

    this.view = new View({ model: this.model });
    this.container.show(this.view);
  }
});

export default new Controller();