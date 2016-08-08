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
    gameGroupList_2: '.selGameGroup_2',
    groupList: '.selGroup',
    yearList: '.selYear',
    yearList_2: '.selYear_2',
    cycleList: '.selCycle'
  },

  initialize(options = {}) {
  
  },

  onBeforeRender() { 
    let gGroupFiltered = _.chain(this.collection.models[0].get('gameGroupOptions'))
    .value();
    let gGroupFiltered_2 = _.chain(this.collection.models[0].get('gameGroupOptions'))
    .value();

    let groupFiltered = _.chain(this.collection.models[0].get('groupOptions'))
    .value();

    let yearFiltered = _.chain(this.collection.models[0].get('yearOptions'))
    .value(); 
    let yearFiltered_2 = _.chain(this.collection.models[0].get('yearOptions'))
    .value(); 

    let cycleFiltered = _.chain(this.collection.models[0].get('cycleOptions'))
    .value();


    this.gGroupFilteredCollection = new Collection(gGroupFiltered);
    this.gGroupFilteredCollection_2 = new Collection(gGroupFiltered_2);

    this.groupFilteredCollection = new Collection(groupFiltered);

    this.yearFilteredCollection = new Collection(yearFiltered); 
    this.yearFilteredCollection_2 = new Collection(yearFiltered_2); 

    this.cycleFilteredCollection = new Collection(cycleFiltered);
  },

  onAttach() {
    this.gGroupCollectionView = new CollectionView({
      collection: this.gGroupFilteredCollection
    }); 
    this.gGroupCollectionView_2 = new CollectionView({
      collection: this.gGroupFilteredCollection_2
    }); 

    this.groupCollectionView = new CollectionView({
      collection: this.groupFilteredCollection
    });

    this.yearCollectionView = new CollectionView({
      collection: this.yearFilteredCollection
    });
    this.yearCollectionView_2 = new CollectionView({
      collection: this.yearFilteredCollection_2
    });

   this.cycleCollectionView = new CollectionView({
      collection: this.cycleFilteredCollection
    });

  
    
    this.gameGroupList.show(this.gGroupCollectionView);
    this.gameGroupList_2.show(this.gGroupCollectionView_2);

    this.groupList.show(this.groupCollectionView);

    this.yearList.show(this.yearCollectionView);
    this.yearList_2.show(this.yearCollectionView_2);

    this.cycleList.show(this.cycleCollectionView);
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


