import {Model} from 'backbone';

export default Model.extend({
  // urlRoot: '/api/colors',
  // urlRoot: '/userManagerController/getUserList.do',
  urlRoot: '/erp/enterpriseEvaluate/showGroupMembers.do',

  defaults: {
  	active: false
  }
});
