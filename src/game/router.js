
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

import LoanInYearRoute from './loanInYear/route';
import LoanManageRoute from './loanManage/route';
import ApplyLoanRoute from './applyLoan/route';

import materialStockRoute from './materialStock/route';
import viewBalanceSheetRoute from './viewBalanceSheet/route';
import viewAccountingEntryRoute from './viewAccountingEntry/route';
import discountRoute from './discount/route';
import viewProfitRoute from './viewProfit/route';
import checkMoneyRoute from './checkMoney/route';


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
    },

<<<<<<< HEAD
    buyMaterial() {
      return new BuyMaterialRoute({
        container:this.container
      });
    },
    postOrder() {
      return new PostOrderRoute({
        container:this.container
      });
    },
    viewOrder() {
      return new ViewOrderRoute({
        container:this.container
      });
    },
    materialOrder() {
      return new MaterialOrderRoute({
        container:this.container
      });
    },
    applyLoan() {
      return new ApplyLoanRoute({
        container:this.container
      });
    },
    loanInYear() {
      return new LoanInYearRoute({
        container:this.container
      });
    },
    loanManage() {
      return new LoanManageRoute({
=======
    productStock() {
      return new ProductStockRoute({
        container:this.container
      });
    },

    materialStock() {
      return new materialStockRoute({
        container:this.container
      });
    },

    viewAccountingEntry() {
      return new viewAccountingEntryRoute({
        container:this.container
      });
    },

    viewBalanceSheet() {
      return new viewBalanceSheetRoute({
        container:this.container
      });
    },

    checkMoney() {
      return new checkMoneyRoute({
        container:this.container
      });
    },

    viewProfit() {
      return new viewProfitRoute({
        container:this.container
      });
    },

    discount() {
      return new discountRoute({
>>>>>>> 60e9f501a1cda3f41e004c142d80f5d541781fd1
        container:this.container
      });
    }

});
