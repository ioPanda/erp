
import {Route} from 'backbone-routing';
import LayoutView from './layout-view';
import Collection from './collection';

export default Route.extend({
  initialize(options = {}) {
    this.container = options.container;
    this.collection = new Collection();
  },

  fetch() {
  	return this.collection.fetch();
  },

  render(params) {
    let page = params && parseFloat(params.page) || 1;

    this.layoutView = new LayoutView({
      collection: this.collection,
      page: page
    });

    this.container.show(this.layoutView);
  },

  destroy() {
  	this.layoutView.remove();
  }
});
