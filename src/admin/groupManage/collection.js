import {Collection} from 'backbone';
import Model from './model';

export default Collection.extend({
  url: '/erp/gameGroupManager/showGameGroups.do',
  // url: '/api/colors',
  model: Model
});
