import {Model} from 'backbone';

export default Model.extend({
  // urlRoot: '/api/colors',
  urlRoot: '/userManagerController/getUserList.do',

  defaults: {
  	active: false
  }
});
