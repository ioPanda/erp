import {Model} from 'backbone';

export default Model.extend({
  // urlRoot: '/api/colors',
  urlRoot: '/erp/userManager/findAllApprovedUser.do',

  // urlRoot: '/userManagerController/getUserList.do',

  defaults: {
  	active: false
  }
});
