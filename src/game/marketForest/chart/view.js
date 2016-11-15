import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import $ from 'jquery';
import _ from 'lodash';
import echarts from 'echarts';
import Backbone from 'backbone';

export default ItemView.extend({
  template: template,
  className: 'request_content',
  
  initialize(options={}){
    Backbone.on('chartEvent',this.show,this);
  },
  
  show (cModel) {      //传递参数
    let mName = cModel.marketName,
        mountMap = cModel.mountMap,
        priceMap = cModel.priceMap,
        mountMap_Max = mountMap.mountMax,
        mountMap_Min = mountMap.mountMin,
        priceMap_Max = priceMap.priceMax,
        priceMap_Min = priceMap.priceMin;
        // mountMap_Arr = mountMap.,
        // priceMap_Arr = priceMap.;
    // let Arr = mountMap_Arr.concact(priceMap_Arr);
    // this.getChart(Arr);
    return;
  },

  getChart (obj) {
    let name = obj[0],
        ec = echarts.init($("#request").get(0)),
        ec_1 = echarts.init($("#price").get(0));
    ec.showLoading({
      text:'正在努力加载数据......'
    });
    ec_1.showLoading({
      text:'正在努力加载数据......'
    })
    if(obj != null){
      ec.hideLoading();
      ec_1.hideLoading();
    }
    
    let option = {
      title:{
        text:name+'需求量预测图',
        left:'center'
      },
      legend: {
        data: ['P1', 'P2', 'P3', 'P4'],
        y:'bottom'
      },
      xAxis:[
        {
          type:'category',
          name:'时期',
          data:['1','2','3'],
          nameLocation:'end'
        }
      ],
      yAxis:[
        {
          type:'value',
          name:'需求量'
        }
      ],
      tooltip:{
        trriger:'axis',
        axisPointer : {
          type:'shadow'
        }
      },
      series:[
        {
          name:'P1',
          type:'bar',
          data:obj[1]
        },
        {
          name:'P2',
          type:'bar',
          data:obj[2]
        },
        {
          name:'P3',
          type:'bar',
          data:obj[3]
        },
        {
          name:'P4',
          type:'bar',
          data:obj[4]
        }
      ]
    };
    let option_1 = {
      title:{
        text:name+'销售价格预测图',
        left:'center'
      },
      legend: {
        data: ['P1', 'P2', 'P3', 'P4'],
        y: 'bottom'
      },
      xAxis:{
        type:'category',
        name:'时期',
        data:['1','2','3'],
        nameLocation:'end'
      },
      tooltip:{
        trriger:'axis',
        axisPointer : {
          type:'line'
        }
      },
      yAxis:{
        type:'value',
        name:'销售价格'
      },
      series:[
        {
          name:'P1',
          type:'line',
          data:obj[5]
        },
        {
          name:'P2',
          type:'line',
          data:obj[6]
        },
        {
          name:'P3',
          type:'line',
          data:obj[7]
        },
        {
          name:'P4',
          type:'line',
          data:obj[8]
        }
      ]
    };
    ec.setOption(option);
    ec_1.setOption(option_1);
  }

});
