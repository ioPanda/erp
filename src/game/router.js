
import Backbone from 'backbone';
import {Router} from 'backbone-routing';

import Aside from '../component/aside/service';
import Header from '../component/header/service';

import IndexRoute from './index/route';
import YearMeetingRoute from './year_meeting/route';
import AllMarketRoute from './allMarket/route';
import AdsAndOrderRoute from './adsAndOrder/route';
import MarketForestRoute from './marketForest/route';
import FactoryRoute from './factory/route';
import MaterialIntroRoute from './materialIntro/route';
import ViewOrderRoute from './viewOrder/route';
import PostOrderRoute from './postOrder/route';
import BuyMaterialRoute from './buyMaterial/route';
import MaterialOrderRoute from './materialOrder/route';
import ProductStockRoute from './productStock/route';
import TimeRoute from './time/route';
import ExitRoute from './exit/route';
import ProductManageRoute from './productManage/route';
import AuthenticationManageRoute from './authenticationManage/route';

import routerTable from './routes.json';

export default Router.extend({
    initialize(options = {}) {
      this.container = options.container;
    
    	this.on('before:enter', this.onBeforeEnter);
    },

    // 加载 header & aside 进来
  	onBeforeEnter() {
  		Aside.show('game');
      Header.show();
  	},

  	routes: routerTable,

    // 不同路由的实例
  	index() {
    	return new IndexRoute({
    		container: this.container
    	});
    },

    authenticationManage() {
      return new AuthenticationManageRoute({
        container: this.container
      });
    },

    factory() {
      return new FactoryRoute({
        container: this.container
      });
    },

    yearMeeting() {
      return new YearMeetingRoute({
        container: this.container
      });
    },

    allMarket() {
      return new AllMarketRoute({
        container: this.container
      });
    },

    productManage() {
        return new ProductManageRoute({
          container: this.container
        });
    },

    materialIntro() {
        return new MaterialIntroRoute({
          container: this.container
        });
    },

    time() {
      return new TimeRoute({
        container: this.container
      });
    },

    exit() {
      return new ExitRoute({
        container: this.container
      });
    },
    
    adsAndOrder(step) {
      return new AdsAndOrderRoute({
        step     : step,
        container:this.container
      });
    },
    
    marketForest() {
      return new MarketForestRoute({
        container:this.container
      });
    }
});
