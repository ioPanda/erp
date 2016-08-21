import _ from 'lodash';
import $ from 'jquery';
import {LayoutView} from 'backbone.marionette';
import CollectionView from './content/collection-view';
import {Collection} from 'backbone';
import template from './layout-template.hbs';

export default LayoutView.extend({
  template: template,
  className: 'companyRate',

  regions: {
    moduleList: '.selModule',
    gameGroupList: '.selGameGroup',
    groupList: '.selGroup',
    yearList: '.selYear'
  },

  initialize(options = {}) {
    this.moduleData = options.moduleData;
    this.gameGroupData = options.gameGroupData;
  },

  onBeforeRender() {    
    let mFiltered = _.chain(this.moduleData)
      .value();
    
    let gameGroup=this.gameGroupData;
    let gGroupFiltered=[{"gameGroup":"请选择游戏组"}];
    for(let i=0;i<gameGroup.length;i++){
       gGroupFiltered.push({"gameGroup":gameGroup[i]['gName']});
    }

    let groupFiltered=[{"group":"请选择小组"}];

    let yearFiltered =[{"year":"请选择年份"}];

    this.mFilteredCollection = new Collection(mFiltered);

    this.gGroupFilteredCollection = new Collection(gGroupFiltered);

    this.groupFilteredCollection = new Collection(groupFiltered);

    this.yearFilteredCollection = new Collection(yearFiltered);
  },

  onAttach() {

    this.moduleList.show(new CollectionView({
        collection: this.mFilteredCollection
    }));
    
    this.gameGroupList.show(new CollectionView({
        collection: this.gGroupFilteredCollection
    }));

    this.groupList.show(new CollectionView({
        collection: this.groupFilteredCollection
    }));

    this.yearList.show(new CollectionView({
        collection: this.yearFilteredCollection
    }));
  },

  templateHelpers() {},

  ui: {
    module   : '.selModule select',
    gameGroup: '.selGameGroup select'
  },

  events: {
    'change @ui.module'    : 'module',
    'change @ui.gameGroup': 'gameGroup'
  },

  module(e){
    // alert(e.target.selectedIndex);
    let index=e.target.selectedIndex;

    this.moduleData[index]['hasGroup']==false ? $('.selGroup select').css('display','none') : $('.selGroup select').css('display','block');

    this.moduleData[index]['hasYear']==false ? $('.selYear select').css('display','none') : $('.selYear select').css('display','block');
       

  },

  gameGroup(e){
    $('.selGroup select').html('<option>请选择小组</option>');
    $('.selYear select').html('<option>请选择年份</option>');

    let index=e.target.selectedIndex-1;    //第 0 个不考虑
    
    if(index>=0){
       let groups = this.gameGroupData[index]['group'];
       let years = this.gameGroupData[index]['year'];

       for(let i=0;i<groups.length;i++){
          let option = new Option(groups[i],groups[i]);
          $('.selGroup select').get(0).add(option,undefined);
       } 
       for(let i=0;i<years.length;i++){
          let option = new Option(years[i],years[i]);
          $('.selYear select').get(0).add(option,undefined);
       }
    }
  }


});


