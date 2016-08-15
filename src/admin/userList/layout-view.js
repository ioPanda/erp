import _ from 'lodash';
import $ from 'jquery';
import {LayoutView} from 'backbone.marionette';
import CollectionView from './content/collection-view';
import {Collection} from 'backbone';
import template from './layout-template.hbs';

export default LayoutView.extend({
  template: template,
  className: 'user-list user--index',

  regions: {
    list: '.users__list'
  },

  initialize(options = {}) {
    this.data = options.data;
    this.state = { start: 0, limit: 10 };
    this.state.start = (options.page - 1) * this.state.limit;
  },

  onBeforeRender() {    
    let filtered = _.chain(this.data)
      .drop(this.state.start)
      .take(this.state.limit)
      .value();

    this.filteredCollection = new Collection(filtered);
  },

  onAttach() {
    this.collectionView = new CollectionView({
      collection: this.filteredCollection
    });

    this.list.show(this.collectionView);
  },

  templateHelpers() {
    let total   = Math.floor(this.data.length / this.state.limit) + 1;
    let current = Math.ceil(this.state.start / this.state.limit) + 1;

    let pages = _.times(total, index => {
      return {
        current : index + 1 === current,
        page    : index + 1
      };
    });

    let prev = current - 1 > 0 ? current - 1 : false;
    let next = current < total ? current + 1 : false;

    return { total, current, pages, prev, next };
  },

  

  //页面事件绑定部分
  ui: {
     pageLimit: '#pageLimit',
     checkAll : '#all',
     check    : 'td input'
  },

  events: {
    'change @ui.pageLimit':'changeLimit',
    'click @ui.checkAll'  : 'checkAll',
    'click @ui.check'     : 'check'
  },

  changeLimit(e){
      //重置列表内容
      this.state.limit=$('.page select').val();
      this.state.start = (this.page - 1) * this.state.limit;

      let filtered = _.chain(this.data)
        .drop(this.state.start)
        .take(this.state.limit)
        .value();

      this.filteredCollection = new Collection(filtered);

      this.collectionView = new CollectionView({
         collection: this.filteredCollection
      });

      this.list.show(this.collectionView);
      
      //重置页码数
      let num = Math.ceil(this.data.length / this.state.limit);
      
      if($('.pagination').children().length!=(num+2)){
         $('.pagination').html('');
         $('.pagination').append('<li class="disabled"><a>&laquo;</a></li>');
         for(let i=0;i<num;i++){
            $('.pagination').append('<li><a href="#colors?page='+(i+1)+'">'+(i+1)+'</a></li>');
         }
         $('.pagination').append('<li><a>&raquo;</a></li>');
         
         $('.pagination').children().removeClass('active');
         $('.pagination').children().eq(1).addClass('active');
         $('.pagination').children().length=3 ? $('.pagination').children().last().addClass('disabled') : '';
      }
  },

  checkAll(e){
     $('#all').prop('checked')==true ? 
     $('td input').prop('checked',true) : 
     $('td input').prop('checked',false);
  },
  check(e){
     $(e.target).prop('checked')==true ? 
     $(e.target).prop('checked',true) : 
     $(e.target).prop('checked',false);
      // alert($('td input').eq(0).prop('checked'));
      // alert($('td input').size());
      // alert($(e.target).prop('checked'));
  }

  
});
