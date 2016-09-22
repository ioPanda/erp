import _ from 'lodash';
import $ from 'jquery';
import {LayoutView} from 'backbone.marionette';
import CollectionView from './content/collection-view';
import {Collection} from 'backbone';
import template from './layout-template.hbs';
import echarts from 'echarts';
import ModalService from '../../component/modal/service';

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
    for(let i=0; i<gameGroup.length; i++) {
       gGroupFiltered.push({"gameGroup":gameGroup[i]['groupNames']});
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
    module     : '.selModule select',
    gameGroup  : '.selGameGroup select',
    viewComRate: '.select-group button'
  },

  events: {
    'change @ui.module'    : 'module',
    'change @ui.gameGroup' : 'gameGroup',
    'click @ui.viewComRate': 'viewComRate'
  },
 
  module(e){
    let index=e.target.selectedIndex;

    this.moduleData[index]['hasGroup']===false ? $('.selGroup select').css('display','none') : $('.selGroup select').css('display','block');

    this.moduleData[index]['hasYear']===false ? $('.selYear select').css('display','none') : $('.selYear select').css('display','block');
  },

  gameGroup(e){
    $('.selGroup select').html('<option>请选择小组</option>');
    $('.selYear select').html('<option>请选择年份</option>');

    let index=e.target.selectedIndex-1;    //第 0 个不考虑
    
    if(index>=0){
       let groups = this.gameGroupData[index]['members'];
       let years = this.gameGroupData[index]['year'];   // 注意此处的years不是数组

       for(let i=0; i<groups.length; i++){
          let option = new Option(groups[i]['userID'],groups[i]['userID']);
          $('.selGroup select').get(0).add(option,undefined);
       } 
       for(let i=1; i <= years; i++){
          let option = new Option('第'+i+'年','第'+i+'年');
          $('.selYear select').get(0).add(option,undefined);
       }
    }
  },

  viewComRate(e){
    let a = $('.select-group select:visible');
    let arr = [];
    for(let i=0;i<a.length;i++){
        if(a[i].selectedIndex===0){
          ModalService.request('alert', {
            title : '',
            text  : '请选择必要的选项！'
          });
          return;
        }else{
          arr.push(a[i].selectedIndex);   //保存每一个下拉列表的选中项的索引
        }
    }
    
    let myChart = echarts.init($('#view-comRate').get(0));
    
    let ser = [];
    let selModule = this.moduleData[arr[0]]; // selModule 是被选定的某一个 模块
    let legend = selModule['legend'];
    let type = selModule['type'];
    let stack = selModule['stack'];
    let xAxis = [];

    if(this.moduleData[arr[0]]['xAxis']==='group'){
       for(let i = 0; i < this.gameGroupData[arr[1]-1]['members'].length; i++){
          xAxis.push(this.gameGroupData[arr[1]-1]['members'][i]['userID']);
       }
    } else {
       for(let i = 1; i <= this.gameGroupData[arr[1]-1]['year']; i++){
          xAxis.push('第'+ i +'年');
       }
    }
  
    let url,
        groupName = this.gameGroupData[arr[1]]['groupNames'],
        year = arr[2],
        userunique,
        group;

    arr[0] === 5 ? userunique = this.gameGroupData[arr[1]-1]['members'][arr[2]-1]['userunique'] : userunique = '';
    console.log(userunique);

    function createAjax(urlData){
       let jqXHR = $.ajax({
          type: 'GET',
          url : urlData
       });

       jqXHR.done(function(response) {
          let res = {
             status:'1',
             data:[{
               username:'001',
               rate:7
             },{
               username:'002',
               rate:14
             },{
               username:'003',
               rate:17
             },{
               username:'004',
               rate:23
             },{
               username:'005',
               rate:16
             },{
               username:'006',
               rate:7
             }]
          };
          
          for(let i = 0; i < res.data.length; i++) {
             let s = {};
             s.name = res.data[i].username;
             s.type = type;
             s.data = res.data[i].rate;
             ser.push(s);
             console.log(s.name);
          }
       });

       jqXHR.fail(function(xhr, errorText, errorStatus) {
          ModalService.request('alert', {
             title : errorText,
             text: '请求连接失败！'
          });
       }); 
    }    

    switch  (arr[0]) {
       case 1: url = '/erp/enterpriseEvaluate/getUserIORatesOfAd.do?groupName='+groupName+'&year='+year;
               createAjax(url);
               break;

       case 2: url = '/erp/enterpriseEvaluate/getGeneralMarketShare.do?groupName='+groupName+'&year='+year;
               createAjax(url);
               break;

       case 3: url = '/erp/enterpriseEvaluate/getProductMarketShare.do?groupName='+groupName+'&year='+year;
               createAjax(url);
               break;

       case 4: url = '/erp/enterpriseEvaluate/getCostStructure.do?groupName='+groupName+'&year='+year;
               createAjax(url);
               break;

       case 5: url = '/erp/enterpriseEvaluate/getCostStructureChanges.do?groupName='+groupName+'&userunique='+userunique;
               createAjax(url);
               break;

       case 6: url = '/erp/enterpriseEvaluate/getProductsProfit.do?groupName='+groupName+'&year='+year;
               createAjax(url);
               break;

       case 7: url = '/erp/enterpriseEvaluate/getMembersCapacity.do?groupName='+groupName;
               createAjax(url);
               break;
    }



    // if(arr.length === 3 && arr[0]!== 5){
    //    let k = series[arr[1]][arr[2]];
    //    for(let i=0;i<k.length;i++){
    //      let s = {};
    //      arr[0] === 2 ? s.name = legend[i].name : s.name = legend[i];
    //      stack !== undefined ? s.stack = stack :'';
    //      s.type = type;
    //      s.data = k[i].data;
    //      ser.push(s);                   
    //    }
    // }
    // else if(arr[0] === 5){
    //    let datas = series[arr[1]]; // 选出 选中游戏组的那一组数据
      
    //    for(let j=0;j<legend.length;j++){
    //       let s = {};
    //       s.name = legend[j];
    //       s.type = type;
    //       s.data = [];
    //       for(let i in datas){
    //          s.data.push(datas[i][j].data[arr[2]-1]);
    //       }
    //       // alert(s.data);
    //       ser.push(s);
    //    }
    // }
    // else if(arr.length === 2){
    //    let k = series[arr[1]];
    //    let s = {};
    //    s.name = legend;
    //    s.type = type;
    //    s.data = k.data;
    //    ser.push(s);
    // }
    
    let option = {
        title: {
            text: this.moduleData[arr[0]]['module'],
            subtext: '游戏组：'+this.gameGroupData[arr[1]-1]['groupNames'],
            left: 'left'
        },

        toolbox: {
            show: true,
            feature: {
                mark: {show: true},
                // dataZoom: {show: true},
                dataView: {show: true},
                magicType: {type: ['line','bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },

        tooltip: {trigger: 'axis'},

        legend: {data: legend},

        xAxis: {data: ['4', '2', '3', '4']},

        yAxis: {},
        
        series: ser
        
    };
    
    myChart.setOption(option);
  }
  


});

















































/*import _ from 'lodash';
import $ from 'jquery';
import {LayoutView} from 'backbone.marionette';
import CollectionView from './content/collection-view';
import {Collection} from 'backbone';
import template from './layout-template.hbs';
import echarts from 'echarts';

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
    module     : '.selModule select',
    gameGroup  : '.selGameGroup select',
    viewComRate: '.select-group button'
  },

  events: {
    'change @ui.module'    : 'module',
    'change @ui.gameGroup' : 'gameGroup',
    'click @ui.viewComRate': 'viewComRate'
  },

  module(e){
    // alert(e.target.selectedIndex);
    let index=e.target.selectedIndex;

    this.moduleData[index]['hasGroup']===false ? $('.selGroup select').css('display','none') : $('.selGroup select').css('display','block');

    this.moduleData[index]['hasYear']===false ? $('.selYear select').css('display','none') : $('.selYear select').css('display','block');
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
  },

  viewComRate(e){
    let a = $('.select-group select:visible');
    let arr = [];
    for(let i=0;i<a.length;i++){
        if(a[i].selectedIndex===0){
          alert('请选择必要的选项'+i);
          return;
        }else{
          arr.push(a[i].selectedIndex);   //保存每一个下拉列表的选中项的索引
        }
    }
    
    let myChart = echarts.init($('#view-comRate').get(0));
    
    let ser = [];
    let selModule = this.moduleData[arr[0]]; // selModule 是被选定的某一个 模块
    let legend = selModule['legend'];
    let type = selModule['type'];
    let stack = selModule['stack'];
    let series = selModule['series'];    
    // alert(stack);
    if(arr.length === 3 && arr[0]!== 5){
       let k = series[arr[1]][arr[2]];
       for(let i=0;i<k.length;i++){
         let s = {};
         arr[0] === 2 ? s.name = legend[i].name : s.name = legend[i];
         stack !== undefined ? s.stack = stack :'';
         s.type = type;
         s.data = k[i].data;
         ser.push(s);                   
       }
    }
    else if(arr[0] === 5){
       let datas = series[arr[1]]; // 选出 选中游戏组的那一组数据
      
       for(let j=0;j<legend.length;j++){
          let s = {};
          s.name = legend[j];
          s.type = type;
          s.data = [];
          for(let i in datas){
             s.data.push(datas[i][j].data[arr[2]-1]);
          }
          // alert(s.data);
          ser.push(s);
       }
    }
    else if(arr.length === 2){
       let k = series[arr[1]];
       let s = {};
       s.name = legend;
       s.type = type;
       s.data = k.data;
       ser.push(s);
    }
    
    let option = {
        title: {
            text: this.moduleData[arr[0]]['module'],
            subtext: '游戏组：'+this.gameGroupData[arr[1]-1]['gName'],
            left: 'left'
        },

        toolbox: {
            show: true,
            feature: {
                mark: {show: true},
                // dataZoom: {show: true},
                dataView: {show: true},
                magicType: {type: ['line','bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },

        tooltip: {trigger: 'axis'},

        legend: {data: legend},

        xAxis: {
            data: this.moduleData[arr[0]]['xAxis']==='group' 
            ? this.gameGroupData[arr[1]-1]['group']
            : this.gameGroupData[arr[1]-1]['year']
        },

        yAxis: {},
        
        series: ser
        
    };

    myChart.setOption(option);
  }
  


});


*/