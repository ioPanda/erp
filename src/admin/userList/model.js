import {Model} from 'backbone';

export default Model.extend({
  // urlRoot: '/api/colors',
  urlRoot: '/erp/userManager/findAllApprovedUser.do',

  // url: '/userManagerController/getUserList.do',

  defaults: {
  	active: false
  }
});
