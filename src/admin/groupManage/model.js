import {Model} from 'backbone';

export default Model.extend({
  // urlRoot: '/api/colors',
  urlRoot: '/erp/gameGroupManager/showGameGroups.do',

  defaults: {
  	active: false
  }
});
