import {Collection} from 'backbone';
import Model from './model';

export default Collection.extend({
  // url: '/userManagerController/getUserList.do',
  url: '/erp/enterpriseEvaluate/showGroupMembers.do',
  model: Model
});
