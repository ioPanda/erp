import _ from 'lodash';
import {LayoutView} from 'backbone.marionette';
import CollectionView from './content/collection-view';
import {Collection} from 'backbone';
import template from './layout-template.hbs';

export default LayoutView.extend({
  template: template,
  // className: '',

  regions: {
    moduleList: '.selModule',
    gameGroupList: '.selGameGroup',
    groupList: '.selGroup',
    yearList: '.selYear'
  },

  initialize(options = {}) {
  
  },

  onBeforeRender() {    
    let mFiltered = _.chain(this.collection.models[0].get('moduleOptions'))
      .value();

    let gGroupFiltered = _.chain(this.collection.models[0].get('gameGroupOptions'))
    .value();

    let groupFiltered = _.chain(this.collection.models[0].get('groupOptions'))
    .value();

    let yearFiltered = _.chain(this.collection.models[0].get('yearOptions'))
    .value();

    this.mFilteredCollection = new Collection(mFiltered);

    this.gGroupFilteredCollection = new Collection(gGroupFiltered);

    this.groupFilteredCollection = new Collection(groupFiltered);

    this.yearFilteredCollection = new Collection(yearFiltered);
  },

  onAttach() {
    this.mCollectionView = new CollectionView({
      collection: this.mFilteredCollection
    });

    this.gGroupCollectionView = new CollectionView({
      collection: this.gGroupFilteredCollection
    }); 

    this.groupCollectionView = new CollectionView({
      collection: this.groupFilteredCollection
    });

   this.yearCollectionView = new CollectionView({
      collection: this.yearFilteredCollection
    });

    this.moduleList.show(this.mCollectionView);
    
    this.gameGroupList.show(this.gGroupCollectionView);

    this.groupList.show(this.groupCollectionView);

    this.yearList.show(this.yearCollectionView);
  },

  templateHelpers() {
  //   let total   = Math.ceil(this.collection.length / this.state.limit) + 1;
  //   let current = Math.ceil(this.state.start / this.state.limit) + 1;

  //   let pages = _.times(total, index => {
  //     return {
  //       current : index + 1 === current,
  //       page    : index + 1
  //     };
  //   });

  //   let prev = current - 1 > 0 ? current - 1 : false;
  //   let next = current < total ? current + 1 : false;

  //   return { total, current, pages, prev, next };
   }

    // let total=this.collection.modal[0].get('selects').length;
    
});

