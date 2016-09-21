import {Collection} from 'backbone';
import Model from './model';

export default Collection.extend({
  // url: 'http://172.22.1.159:8080/erp/userManager/getUserList.do',
  url: '/userManagerController/getUserList.do',
  // url: '/api/colors',
  model: Model
});
