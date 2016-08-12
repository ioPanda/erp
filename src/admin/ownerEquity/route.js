/*import {Route} from 'backbone-routing';
import BreadCrumb from '../../component/breadcrumb';
import View from './view';

export default Route.extend({
    initialize(options = {}) {
        this.container = options.container;

        this.view = new View();
        this.container.show(this.view);

        this.on('before:enter', this.onBeforeEnter);
    },

    onBeforeEnter() {
    	BreadCrumb
    }
});*/
import {Route} from 'backbone-routing';
import LayoutView from './layout-view';
import Collection from './collection';
import $ from 'jquery';

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
    
    // if($(this.container).find("#navbar li:last").hasClass("active")){
    //   alert("hahaha");
    // }

    this.container.show(this.layoutView);
  },

  destroy() {
  	this.layoutView.remove();
  }
});
