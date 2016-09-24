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
    selClick   : '.select-group select:visible',
    gameGroup  : '.selGameGroup select',
    viewComRate: '.select-group button'
  },

  events: {
    'change @ui.module'    : 'module',
    'click @ui.selClick'   : 'selClick',
    'change @ui.gameGroup' : 'gameGroup',
    'click @ui.viewComRate': 'viewComRate'

  },
 
  module(e){
    let index=e.target.selectedIndex;

    this.moduleData[index]['hasGroup']===false ? $('.selGroup select').css('display','none') : $('.selGroup select').css('display','block');

    this.moduleData[index]['hasYear']===false ? $('.selYear select').css('display','none') : $('.selYear select').css('display','block');
  },

  selClick(e){
    // alert('jfajef');
    if(e.target.options === 1){
      $(e.target.options[0]).html('暂无数据');
      $('#view-comRate').html('暂无数据');
    }
  },

  gameGroup(e) {
    $('.selGroup select').html('<option>请选择小组</option>');
    $('.selYear select').html('<option>请选择年份</option>');

    let index = e.target.selectedIndex-1;    //第 0 个不考虑
    
    if(index >= 0) {
       let groups = this.gameGroupData[index]['members'];
       let years = this.gameGroupData[index]['year'];   // 注意此处的years不是数组

       for(let i = 0; i < groups.length; i++) {
          let option = new Option(groups[i]['userID'],groups[i]['userID']);
          $('.selGroup select').get(0).add(option,undefined);
       } 
       for(let i = 1; i <= years; i++) {
          let option = new Option('第'+i+'年','第'+i+'年');
          $('.selYear select').get(0).add(option,undefined);
       }
    }
  },

  
  viewComRate(e) {
    let myChart = echarts.init($('#view-comRate').get(0));
    let a = $('.select-group select:visible');
    let arr = [];
    
    $('#view-comRate').html();
    

    for(let i = 0; i < a.length; i++){     
        if(a[i].selectedIndex === 0 && a[i].options.length > 1){
          ModalService.request('alert', {
            title : '',
            text  : '请选择必要的选项！'
          });
          return;
        }else if(a[i].selectedIndex > 0 && a[i].options.length > 1){
          arr.push(a[i].selectedIndex);   //保存每一个下拉列表的选中项的索引
        }
    }
    
    // let myChart = echarts.init($('#view-comRate').get(0));
    
    // let ser = [];
    // let selModule = this.moduleData[arr[0]]; // selModule 是被选定的某一个 模块
    // let legend = selModule['legend'];
    // let type = selModule['type'];
    // let stack = selModule['stack'];
    // let x = [];
    
    // if(this.moduleData[arr[0]]['xAxis']==='group'){
    //    for(let i = 0; i < this.gameGroupData[arr[1]-1]['members'].length; i++){
    //       xAxis.push(this.gameGroupData[arr[1]-1]['members'][i]['userID']);
    //    }
    // } else {
    //    for(let i = 1; i <= this.gameGroupData[arr[1]-1]['year']; i++){
    //       xAxis.push('第'+ i +'年');
    //    }
    // }
    let ser = [];
    let x = [];

    let url,
        groupName = this.gameGroupData[arr[1]]['groupNames'],
        year = arr[2],
        userunique,
        group;

    arr[0] === 5 ? userunique = this.gameGroupData[arr[1]-1]['members'][arr[2]-1]['userunique'] : userunique = '';
    console.log(userunique);

    function createAjax(urlData, done){
       let jqXHR = $.ajax({
          type: 'GET',
          url : urlData
       });

       jqXHR.done(done);

       jqXHR.fail(function(xhr, errorText, errorStatus) {
          ModalService.request('alert', {
             title : errorText,
             text: '请求连接失败！'
          });
       }); 
    }   
    
    let that = this;
    function createEcharts(x, ser){  
      let selModule = that.moduleData[arr[0]]; // selModule 是被选定的某一个 模块
      let legend = selModule['legend'];
      let type = selModule['type'];

      let option = {
          title: {
              text: that.moduleData[arr[0]]['module'],
              subtext: '游戏组：'+that.gameGroupData[arr[1]-1]['groupNames'],
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

          legend: {data: selModule['legend']},

          xAxis: {data: x},

          yAxis: {},
          
          series: ser
        };
      
        myChart.setOption(option);
    }
 

    switch  (arr[0]) {
       case 1: url = '/erp/enterpriseEvaluate/getUserIORatesOfAd.do?groupName='+groupName+'&year='+year;
               function done(response){
                  if(response.data.length === 0) {
                     ModalService.request('alert', {
                        title: '',
                        text: '暂无数据！'
                     });
                  } else {
                     let obj = {};
                     obj.data = [];
                     for(let i = 0; i < response.data.length; i++){
                       x.push(response.data[i].username);
                       obj.data.push(response.data[i].rate);
                     }
                     obj.type = 'line';
                     ser.push(obj);
                     createEcharts(x, ser);
                  }                 
               }
               createAjax(url, done);
               break;

       case 2: url = '/erp/enterpriseEvaluate/getGeneralMarketShare.do?groupName='+groupName+'&year='+year;
               function done(response){
                  if(response.data.length === 0) {
                     ModalService.request('alert', {
                        title: '',
                        text: '暂无数据！'
                     });
                  } else {
                     let local = {data: [], name: '本地市场', type: 'line'};
                     let area = {data: [], name: '区域市场', type: 'line'};
                     let home = {data: [], name: '国内市场', type: 'line'};
                     let asia = {data: [], name: '亚洲市场', type: 'line'};
                     let international = {data: [], name: '国际市场', type: 'line'};

                     for(let i = 0; i < response.data.length; i++){
                        switch (response.data[i].marketname) {
                           case '本地市场': local.data.push(response.data[i].sale);
                                            x.push(response.data[i].member.userID);
                                            break;
                           case '区域市场': area.data.push(response.data[i].sale);
                                            break;
                           case '国内市场': home.data.push(response.data[i].sale);
                                            break;
                           case '亚洲市场': asia.data.push(response.data[i].sale);
                                            break;
                           case '国际市场': international.data.push(response.data[i].sale);
                                            break;
                        }
                     }

                     ser.push(local);
                     ser.push(area);
                     ser.push(home);
                     ser.push(asia);
                     ser.push(international);
                     
                     createEcharts(x, ser);
                  }
               }
               createAjax(url, done);
               break;

       case 3: url = '/erp/enterpriseEvaluate/getProductMarketShare.do?groupName='+groupName+'&year='+year;
               function done(response){
                  if(response.data.length === 0) {
                     ModalService.request('alert', {
                        title: '',
                        text: '暂无数据！'
                     });
                  } else {
                     let obj1 = {data: [], name: 'P1', type: 'line'};
                     let obj2 = {data: [], name: 'P2', type: 'line'};
                     let obj3 = {data: [], name: 'P3', type: 'line'};
                     let obj4 = {data: [], name: 'P4', type: 'line'};

                     for(let i = 0; i < response.data.length; i++){
                        switch (response.data[i].productName) {
                           case 'P1': obj1.data.push(response.data[i].sale);
                                            x.push(response.data[i].member.userID);
                                            break;
                           case 'P2': obj2.data.push(response.data[i].sale);
                                            break;
                           case 'P3': obj3.data.push(response.data[i].sale);
                                            break;
                           case 'P4': obj4.data.push(response.data[i].sale);
                                            break;
                        }
                     }

                     ser.push(obj1);
                     ser.push(obj2);
                     ser.push(obj3);
                     ser.push(obj4);
                     
                     createEcharts(x, ser);
                  }
               }
               createAjax(url, done);
               break;

       case 4: url = '/erp/enterpriseEvaluate/getCostStructure.do?groupName='+groupName+'&year='+year;
               function done(response){
                  if(response.data.length === 0) {
                     ModalService.request('alert', {
                        title: '',
                        text: '暂无数据！'
                     });
                  } else {
                     let productCost = {data: [], name: '直接成本', type: 'bar', stack: '成本'};
                     let ad = {data: [], name: '广告', type: 'bar', stack: '成本'};
                     let operation = {data: [], name: '经营费', type: 'bar', stack: '成本'};
                     let management = {data: [], name: '管理费', type: 'bar', stack: '成本'};
                     let depreciation = {data: [], name: '折旧', type: 'bar', stack: '成本'};
                     let interestCost = {data: [], name: '利息', type: 'bar', stack: '成本'};

                     for(let i = 0; i < response.data.length; i++){
                        productCost.data.push(response.data[i].productCost);
                        ad.data.push(response.data[i].adCost);
                        operation.data.push(response.data[i].operationCost);
                        management.data.push(response.data[i].managementCost);
                        depreciation.data.push(response.data[i].depreciationCost);
                        interestCost.data.push(response.data[i].interestCost);

                        x.push(response.data[i].member.userID);
                     }

                     ser.push(productCost);
                     ser.push(ad);
                     ser.push(operation);
                     ser.push(management);
                     ser.push(depreciation);
                     ser.push(interestCost);
                     
                     createEcharts(x, ser);
                  }
               }
               createAjax(url, done);
               break;

       case 5: url = '/erp/enterpriseEvaluate/getCostStructureChanges.do?groupName='+groupName+'&userunique='+userunique;
               function done(response){
                  if(response.data.length === 0) {
                     ModalService.request('alert', {
                        title: '',
                        text: '暂无数据！'
                     });
                  } else {
                     let productCost = {data: [], name: '直接成本', type: 'line'};
                     let ad = {data: [], name: '广告', type: 'line'};
                     let operation = {data: [], name: '经营费', type: 'line'};
                     let management = {data: [], name: '管理费', type: 'line'};
                     let depreciation = {data: [], name: '折旧', type: 'line'};
                     let interestCost = {data: [], name: '利息', type: 'line'};

                     for(let i = 0; i < response.data.length; i++){
                        productCost.data.push(response.data[i].productCost);
                        ad.data.push(response.data[i].adCost);
                        operation.data.push(response.data[i].operationCost);
                        management.data.push(response.data[i].managementCost);
                        depreciation.data.push(response.data[i].depreciationCost);
                        interestCost.data.push(response.data[i].interestCost);

                        x.push(response.data[i].member.userID);
                     }

                     ser.push(productCost);
                     ser.push(ad);
                     ser.push(operation);
                     ser.push(management);
                     ser.push(depreciation);
                     ser.push(interestCost);
                     
                     createEcharts(x, ser);
                  }
               }
               createAjax(url, done);
               break;

       case 6: url = '/erp/enterpriseEvaluate/getProductsProfit.do?groupName='+groupName+'&year='+year;
               createAjax(url);
               break;

       case 7: url = '/erp/enterpriseEvaluate/getMembersCapacity.do?groupName='+groupName;
               function done(response){
                 if(response.data.length === 0) {
                    ModalService.request('alert', {
                       title: '',
                       text: '暂无数据！'
                    });
                 } else {
                    let obj = {data: [], type: 'bar'};
                    
                    for(let i = 0; i < response.data.length; i++){
                       obj.data.push(response.data[i].capacity);
                       x.push(response.data[i].member.userID);
                    }
                    ser.push(obj);
                    
                    createEcharts(x, ser);
                 }
              }
              createAjax(url, done);
              break;
    }
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