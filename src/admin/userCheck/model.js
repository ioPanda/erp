import {Model} from 'backbone';

export default Model.extend({
  // urlRoot: '/api/colors',
  // urlRoot: '/userManagerController/getUserList.do',

  urlRoot: '/erp/userManager/findAllRegister.do',

  defaults: {
  	active: false
  }
});
