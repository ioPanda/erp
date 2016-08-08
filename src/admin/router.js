import Backbone from 'backbone';
import {Router} from 'backbone-routing';
import Aside from '../component/aside/service';
import Header from "../component/header/service";
import UserListRoute from './userList/route';
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
  	"admin/userList": "userList",
  	"admin/companyRate": "companyRate"
  },

  companyRate() {
  	return new CompanyRateRoute({
  		container: this.container
  	})
  },

  userList() {
  	return new UserListRoute({
  		container: this.container
  	})
  }
});
