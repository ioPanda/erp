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
    // Backbone.on('selectMkt',this.show,this);
    
  },
  
  show ($marketName) {      //传递参数
    for(let i=0; i<this.len; i++){
    let _this = this.collection.models[i].get("marketName"),
        dataList = [];
    	if (_this == $marketName){
        let
        mName = this.collection.models[i].get("marketName"),
        mP1 = this.collection.models[i].get("mountMap").p1,
        mP2 = this.collection.models[i].get("mountMap").p2,
        mP3 = this.collection.models[i].get("mountMap").p3,
        mP4 = this.collection.models[i].get("mountMap").p4,
        pP1 = this.collection.models[i].get("priceMap").p1,
        pP2 = this.collection.models[i].get("priceMap").p2,
        pP3 = this.collection.models[i].get("priceMap").p3,
        pP4 = this.collection.models[i].get("priceMap").p4,
    		_thisMmax = this.collection.models[i].get("mountMap").mountMax,
    		_thisMmin = this.collection.models[i].get("mountMap").mountMin,
    		_thisPmax = this.collection.models[i].get("priceMap").mountMax,
    		_thisPmin = this.collection.models[i].get("priceMap").mountMin;
        dataList.push(mName,mP1,mP2,mP3,mP4,pP1,pP2,pP3,pP4,_thisMmax,_thisMmin,_thisPmax,_thisPmin);
        this.getChart(dataList);
        return false;
    	}
    }
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
