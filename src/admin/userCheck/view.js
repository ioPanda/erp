/*import _ from 'lodash';
import $ from 'jquery';
import {LayoutView} from 'backbone.marionette';
import CollectionView from './content/collection-view';
import {Collection} from 'backbone';
import template from './layout-template.hbs';

export default LayoutView.extend({
	template: template,
	el: '#list',

	regions: {
       list: '.check__list'
    },

    initialize(options = {}) {
      this.state = options.state;
      this.state.start = (options.page - 1) * this.state.limit;


      let filtered = _.chain(this.collection.models[0].get('check'))
    	  .drop(this.state.start)
    	  .take(this.state.limit)
    	  .value();

    	// alert('onBeforeRender');
	    this.filteredCollection = new Collection(filtered);

	    this.collectionView = new CollectionView({
         collection: this.filteredCollection
      });

      this.list.show(this.collectionView);

      this.templateHelpers();

      
    },

   

    templateHelpers() {
      let total   = Math.floor(this.collection.models[0].get('check').length / this.state.limit) + 1;
      let current = Math.ceil(this.state.start / this.state.limit) + 1;
       
      alert('total is  :'+total);
     
      let pages = _.times(total, index => {
        return {
          current : index + 1 === current,
          page    : index + 1
        };
      });

      let prev = current - 1 > 0 ? current - 1 : false;
      let next = current < total ? current + 1 : false;

      alert('total:'+total+'  current:'+current+'   pages:'+pages+'   prev:'+prev+'  next:'+next);

      return { total, current, pages, prev, next };

    }

});*/