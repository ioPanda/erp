import Backbone from 'backbone';
import {Router} from 'backbone-routing';
import Aside from '../component/aside/service';
import Header from "../component/header/service";
import UserListRoute from './userList/route';
import UserCheckRoute from './userCheck/route';
import GroupManageRoute from './groupManage/route';
import CompanyRateRoute from './companyRate/route';
import OwnerEquity from './ownerEquity/route';

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
  	// "admin/ownerEquity": "companyView",

    // "admin/ownerEquity/companyView":"companyView",
    // "admin/ownerEquity/gameGroupView":"gameGroupView"
  },

 

  /*companyView(){
    // alert("companyView");
    // $("#navbar li:last").removeClass("active");
    // $("#navbar li:first").addClass("active");

    return new OwnerEquity({
      container: this.container
    });
  },

  gameGroupView(){
    // alert("gameGroupView");
    // $("#navbar li:first").removeClass("active");
    // $("#navbar li:last").addClass("active");
    
    return new OwnerEquity({
      container: this.container
    });
  },
*/


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
    return new OwnerEquity({
      container: this.container
    })
  }
});
