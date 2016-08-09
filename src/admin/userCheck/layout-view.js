import _ from 'lodash';
import $ from 'jquery';
import {LayoutView} from 'backbone.marionette';
import CollectionView from './content/collection-view';
import {Collection} from 'backbone';
import template from './layout-template.hbs';
import View from './view';
// import Route from './route';

export default LayoutView.extend({
  template: template,
  id:'list',
  className: 'check-list check--index',

  regions: {
    list: '.check__list'
  },

  initialize(options = {}) {
    this.state = { start: 0, limit: 10};
    this.page=options.page;
    this.state.start = (options.page - 1) * this.state.limit;
  },
  // initialize(options = {}) {
  //   this.layoutView=options.layoutView;
  //   this.state = options.state?options.state:{ start: 0, limit: 40 };
  //   alert();
  //   this.page=options.page;
  //   this.state.start = (options.page - 1) * this.state.limit;
  // },

  onBeforeRender() {
    let filtered = _.chain(this.collection.models[0].get('check'))
      .drop(this.state.start)
      .take(this.state.limit)
      .value();
    
    // alert(JSON.stringify(filtered));
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
  },



  //页面事件绑定部分
  ui: {
     pageLimit: '#pageLimit',

  },

  events: {
    'change @ui.pageLimit':'changeLimit',
  },

  changeLimit(e){
     this.state.limit=$('.page select').val();
     
     this.view = new View({
      collection: this.collection,
      state: this.state,
      page:this.page
    });

     
     //  this.route = new Route({
     //   collection: this.collection,
     //   state: this.state,
     //   page:this.page
     // });

  },





});









