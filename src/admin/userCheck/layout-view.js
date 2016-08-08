import _ from 'lodash';
import {LayoutView} from 'backbone.marionette';
import CollectionView from './content/collection-view';
import {Collection} from 'backbone';
import template from './layout-template.hbs';

export default LayoutView.extend({
  template: template,
  className: 'check-list check--index',

  regions: {
    list: '.check__list'
  },

  initialize(options = {}) {
    this.state = { start: 0, limit: 5 };
    this.state.start = (options.page - 1) * this.state.limit;
  },

  onBeforeRender() { 
    let filtered = _.chain(this.collection.models[0].get('check'))
      .drop(this.state.start)
      .take(this.state.limit)
      .value();

    this.filteredCollection = new Collection(filtered);
  },

  onAttach() {
    this.collectionView = new CollectionView({
      collection: this.filteredCollection
    });

    this.list.show(this.collectionView);
  },

  templateHelpers() {
    let total   = Math.floor(this.collection.models[0].get('check').length / this.state.limit) + 1;
    let current = Math.ceil(this.state.start / this.state.limit) + 1;

    // alert(total);
    // alert(JSON.stringify(this.collection));

    let pages = _.times(total, index => {
      return {
        current : index + 1 === current,
        page    : index + 1
      };
    });

    let prev = current - 1 > 0 ? current - 1 : false;
    let next = current < total ? current + 1 : false;

    return { total, current, pages, prev, next };
  }
});
