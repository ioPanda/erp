
import {Route} from 'backbone-routing';
import LayoutView from '../ownerEquity/layout-view';
import Collection from '../ownerEquity/collection';

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
      page: page,
      gameGroupData: this.collection.models[0].get('oldGameGroup')
    });

    this.container.show(this.layoutView);
  },

  destroy() {
    this.layoutView.remove();
  }
});
