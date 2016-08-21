import _ from 'lodash';
import $ from 'jquery';
import {LayoutView} from 'backbone.marionette';
import CollectionView from './content/collection-view';
import {Collection} from 'backbone';
import template from './layout-template.hbs';

export default LayoutView.extend({
  template: template,
  className: 'ownerEquity',
  
  regions: {
    moduleList: '.selModule',
    gameGroupList_c: '.selGameGroup_c', 
    gameGroupList_g: '.selGameGroup_g',
    groupList: '.selGroup',
    yearList_c: '.selYear_c',
    yearList_g: '.selYear_g',
    cycleList: '.selCycle'
  },

  initialize(options = {}) {
    this.gameGroupData = options.gameGroupData;
  },

  onBeforeRender() { 
    let gameGroup=this.gameGroupData;
    let gGroupFiltered=[{"gameGroup":"请选择游戏组"}];
    for(let i=0;i<gameGroup.length;i++){
       gGroupFiltered.push({"gameGroup":gameGroup[i]['gName']});
    }

    let groupFiltered=[{"group":"请选择小组"}];

    let yearFiltered =[{"year":"请选择年份"}];

    let cycleFiltered =[{"year":"请选择周期"}];

    this.gGroupFilteredCollection_c = new Collection(gGroupFiltered);
    this.gGroupFilteredCollection_g = new Collection(gGroupFiltered);

    this.groupFilteredCollection = new Collection(groupFiltered);

    this.yearFilteredCollection_c = new Collection(yearFiltered); 
    this.yearFilteredCollection_g = new Collection(yearFiltered); 

    this.cycleFilteredCollection = new Collection(cycleFiltered);

   
  },

  onAttach() {
    this.gGroupCollectionView_c = new CollectionView({
       collection: this.gGroupFilteredCollection_c
     }); 
     this.gGroupCollectionView_g = new CollectionView({
       collection: this.gGroupFilteredCollection_g
     }); 

     this.groupCollectionView = new CollectionView({
       collection: this.groupFilteredCollection
     });

     this.yearCollectionView_c = new CollectionView({
       collection: this.yearFilteredCollection_c
     });
     this.yearCollectionView_g = new CollectionView({
       collection: this.yearFilteredCollection_g
     });

     this.cycleCollectionView = new CollectionView({
       collection: this.cycleFilteredCollection
     });
     
     this.gameGroupList_c.show(this.gGroupCollectionView_c);
     this.gameGroupList_g.show(this.gGroupCollectionView_g);

     this.groupList.show(this.groupCollectionView);

     this.yearList_c.show(this.yearCollectionView_c);
     this.yearList_g.show(this.yearCollectionView_g);

     this.cycleList.show(this.cycleCollectionView);
   },

  templateHelpers() {},
  
  ui: {
    companyLink: '#navbar li:first',
    gameGroupLink: '#navbar li:last',

    gameGroup_c: '.selGameGroup_c select',
    gameGroup_g: '.selGameGroup_g select',
  },

   events: {
    'click @ui.companyLink': 'link',
    'click @ui.gameGroupLink': 'link',

    'change @ui.gameGroup_c': 'gameGroup',
    'change @ui.gameGroup_g': 'gameGroup'
   },

    link(e){
       let left_=$(window).width(); 
       
       $(e.target).parent().siblings('li').removeClass('active');
       $(e.target).parent().addClass('active');
       
       let index=0;
       let i=1;
       $(e.target).text()=='按企业查看' ? index=0 : index=1;
       $(e.target).text()=='按企业查看' ? i=1 : i=-1;
       
       $('.select-group').children().eq(index).animate({left: 0});
       $('.select-group').children().eq(index).siblings('div').animate({left: i*left_},500);
   },
  
   gameGroup(e){
     let index=e.target.selectedIndex-1;    //第 0 个不考虑
     let $$=$(e.target).parent().parent().parent();

     if(index>=0){
        let groups = this.gameGroupData[index]['group'];
        let years = this.gameGroupData[index]['year'];
        let cycles = this.gameGroupData[index]['cycle'];
        
        if($$.find('.selGroup').size()!=0){
          $('.selGroup select').html('<option>请选择小组</option>');
          for(let i=0;i<groups.length;i++){
             let option = new Option(groups[i],groups[i]);
             $('.selGroup select').get(0).add(option,undefined);
          } 
        }

        if($$.find('.year').size()!=0){
          $$.find('.year select').html('<option>请选择年份</option>');
          for(let i=0;i<years.length;i++){
             let option = new Option(years[i],years[i]);
             $$.find('.year select').get(0).add(option,undefined);
          }
        }
        
        if($$.find('.selCycle').size()!=0){
          $$.find('.selCycle select').html('<option>请选择周期</option>');
          for(let i=0;i<cycles.length;i++){
             let option = new Option(cycles[i],cycles[i]);
             $$.find('.selCycle select').get(0).add(option,undefined);
          }
        }
     }

   },

 
});


