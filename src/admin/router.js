import Backbone from 'backbone';
import {Router} from 'backbone-routing';
import Aside from '../component/aside/service';
import Header from "../component/header/service";
import UserListRoute from './userList/route';
import UserCheckRoute from './userCheck/route';
import GroupManageRoute from './groupManage/route';
import CompanyRateRoute from './companyRate/route';
import OwnerEquityRoute from './ownerEquity/route';
import OldCompanyRateRoute from './oldCompanyRate/route';
import OldOwnerEquityRoute from './oldOwnerEquity/route';

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
  	"admin/userCheck": "userCheck",
    "admin/groupManage":"groupManage",
    "admin/companyRate": "companyRate",
    "admin/ownerEquity": "ownerEquity",
  	"admin/oldCompanyRate": "oldCompanyRate",
    "admin/oldOwnerEquity": "oldOwnerEquity"
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
  },

  userCheck() {
  	return new UserCheckRoute({
  		container: this.container
  	})
  },

  groupManage() {
    return new GroupManageRoute({
      container: this.container
    })
  },

  ownerEquity() {
    return new OwnerEquityRoute({
      container: this.container
    })
  },

  oldCompanyRate(){
    return new OldCompanyRateRoute({
      container: this.container
    })
  },

  oldOwnerEquity() {
    return new OldOwnerEquityRoute({
      container: this.container
    })
  }
});
