import {ItemView} from 'backbone.marionette';
import template from './item-template.hbs';

export default ItemView.extend({
  tagName: 'tr',
  template: template,
  className: 'group__item',
  // className: 'users__item list-group-item',  
   // 去除此处的 list-group-item 和 collection-tpl.js中的list-group 才能使表格的 <td>和<th>对齐显示

  // attributes() {
  //   return {
  //     'data-uid': `#users/${this.model.get('userId')}`
  //   };
  // },

  modelEvents: {
    all: 'render'
  }
});
