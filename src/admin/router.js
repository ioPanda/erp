import Backbone from 'backbone';
import {Router} from 'backbone-routing';
import Aside from '../component/aside/service';
import Header from "../component/header/service";
import CompanyRateRoute from './companyRate/route';

export default Router.extend({
  initialize(options = {}) {
    this.container = options.container;

    this.on('before:enter', this.onBeforeEnter);
  },

  onBeforeEnter() {
  	Aside.show('admin');
  	Header.show();
  },

  routes:{
  	"admin/companyRate": "companyRate"
  },

  companyRate() {
  	return new CompanyRateRoute({
  		container: this.container
  	})
  }
});
