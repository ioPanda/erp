import {Collection} from 'backbone';
import Model from './model';

export default Collection.extend({
  url: '/erp/userManager/findAllApprovedUser.do',

  // url: '/userManagerController/getUserList.do',
  // url: '/api/colors',
  model: Model
});
