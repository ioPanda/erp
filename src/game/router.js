
import Backbone from 'backbone';
import {Router} from 'backbone-routing';

import Aside from '../component/aside/service';
import Header from '../component/header/service';

import IndexRoute from './index/route';
import YearMeetingRoute from './year_meeting/route';
import MarketRoute from './market/route';
import ProduceRoute from './produce/route';
import SaleRoute from './sale/route';
import PurchaseRoute from './purchase/route';
import StockRoute from './stock/route';
import AuthenticateRoute from './authenticate/route';
import FinanceRoute from './finance/route';
import LoanRoute from './loan/route';
import TaxRoute from './tax/route';
import TimeRoute from './time/route';
import ExitRoute from './exit/route';

export default Router.extend({
    initialize(options = {}) {
      this.container = options.container;
    
    	this.on('before:enter', this.onBeforeEnter);
    },

  	onBeforeEnter() {
  		Aside.show('game');
      Header.show();
    	console.log('game');
  	},

  	routes: {
      "game/index": "index",
      "game/year_meeting": "yearMeeting",
      "game/market": "market",
      "game/produce": "produce",
      "game/sale": "sale",
      "game/purchase": "purchase",
      "game/stock": "stock",
      "game/authenticate": "authenticate",
      "game/finance": "finance",
      "game/loan": "loan",
      "game/tax": "tax",
      "game/time": "time",
      "game/exit": "exit"
    },

  	index() {
    	return new IndexRoute({
    		container: this.container
    	});
    },

    yearMeeting() {
      return new YearMeetingRoute({
        container: this.container
      });
    },

    market() {
      return new MarketRoute({
        container: this.container
      });
    },

    produce() {
      return new ProduceRoute({
        container: this.container
      });
    },

    sale() {
      return new SaleRoute({
        container: this.container
      });
    },

    purchase() {
      return new PurchaseRoute({
        container: this.container
      });
    },

    authenticate() {
      return new AuthenticateRoute({
        container: this.container
      });
    },

    finance() {
      return new FinanceRoute({
        container: this.container
      });
    },

    loan() {
      return new LoanRoute({
        container: this.container
      });
    },

    tax() {
      return new TaxRoute({
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
    }
});
