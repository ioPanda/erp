import _ from 'lodash';
import $ from 'jquery';
import {LayoutView} from 'backbone.marionette';
import CollectionView from './content/collection-view';
import {Collection} from 'backbone';
import template from './layout-template.hbs';

export default LayoutView.extend({
  template: template,
  className: 'group-list user--index',

  regions: {
    list: '.group__list'
  },

  initialize(options = {}) {
    this.state = { start: 0, limit: 10};
    this.state.start = (options.page - 1) * this.state.limit;
    this.data = options.data;
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

    $('.group__item').unwrap();   // 去除 <tr class=''> 外部包含的 <tr class="">  -----表格布局

    $('.details').hide();
    
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
     pageLimit : '#pageLimit',
     details   : '.glyphicon-plus',
     delete    : '.delete',
     addHistroy: '.addHistroy'
  },

  events: {
    'change @ui.pageLimit': 'changeLimit',
    'click @ui.details'   : 'toggleDetails',
    'click @ui.delete'    : 'delete',
    'click @ui.addHistroy': 'addHistroy'
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

       $('.group__item').unwrap();   // 去除 <tr class=''> 外部包含的 <tr class="">  -----表格布局

       $('.details').hide();
      
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

  toggleDetails(e){
    var $this = $(e.target).parent().parent();
    var $next = $this.nextUntil('.item');

    $next.slideToggle('slow');

    $(e.target).toggleClass('glyphicon-minus');
    
    // $next.eq(0).slideToggle('normal',function(){
    //   $next.eq(1).slideToggle('normal');
    // });
  },

  delete(){
    alert('delete');
  },

  addHistroy(){
    alert('addHistroy');
  }

});
