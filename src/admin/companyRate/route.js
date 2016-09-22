import {Route} from 'backbone-routing';
import LayoutView from './layout-view';
import Collection from './collection';

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
      page: page,
      gameGroupData: this.collection.models[0].get('data'),
      moduleData: [
    {
      "module":"请选择分析模块",
      "hasGroup":true,
      "hasYear":true
    },
    {
      "module":"广告投入产出分析",
      "hasGroup":false,
      "hasYear":true,
      "type":"line",
      "xAxis":"group",
      "legend":[],
      
        
    },
    {
      "module":"综合市场占有率分析",
      "hasGroup":false,
      "hasYear":true,
      "type":"line",
      "xAxis":"group",
      "legend":[{
        "name":"本地市场",
        "icon":"circle"
       },
       {
        "name":"区域市场",
        "icon":"rect"
       },
       {
        "name":"国内市场",
        "icon":"triangle"
       },
       {
        "name":"亚洲市场",
        "icon":"diamond"
       },
       {
        "name":"国际市场",
        "icon":"arrow"
       }]
      
    },
    {
      "module":"产品市场占有率分析",
      "hasGroup":false,
      "hasYear":true,
      "type":"line",
      "xAxis":"group",
      "legend":["P1","P2","P3","P4"],
      
    },
    {
      "module":"成本费用占销售比例分析",
      "hasGroup":false,
      "hasYear":true,
      "type":"bar",
      "xAxis":"group",
      "stack":"成本",
      "legend":["直接成本","广告","经营费","管理费","折旧","利息"]
        
    },
    {
      "module":"成本费用占销售比例变化分析",
      "hasGroup":true,
      "hasYear":false,
      "type":"line",
      "xAxis":"year",
      "legend":["直接成本","广告","经营费","管理费","折旧","利息"]
    },
    {
      "module":"产品贡献利润分析",
      "hasGroup":true,
      "hasYear":true
    },
    {
      "module":"生产能力分析",
      "hasGroup":false,
      "hasYear":false,
      "type":"bar",
      "xAxis":"group",
      "legend":[]     
    }
  ]
      
    });

    this.container.show(this.layoutView);
  },

  destroy() {
  	this.layoutView.remove();
  }
});
