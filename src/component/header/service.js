import Marionette from 'backbone.marionette';
//import Collection from './collection';
import {Collection} from 'backbone';
import Model from './model';
import View from './view';

var Controller = Marionette.Object.extend({
  setup(options = {}) {
    this.container = options.container;
  },

  show(type) {
    this.collection = new Collection();
    var model = new Model({type: type});
    this.collection.add(model);

    this.view = new View({ collection: this.collection });
    this.container.show(this.view);
  }
});


export default new Controller();
/*export default Marionette.AppRouter.extend({
  initialize: function(options) {
    this.controller = new Controller(options);
  }
});*/