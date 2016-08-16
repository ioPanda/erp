
import _ from 'lodash';
import $ from 'jquery';
import {LayoutView} from 'backbone.marionette';
import CollectionView from './content/collection-view';
import {Collection} from 'backbone';
import template from './layout-template.hbs';


export default LayoutView.extend({
  template: template,
  id:'list',
  className: 'check-list check--index',

  regions: {
    list: '.check__list'
  },

  initialize(options = {}) {
    this.page = options.page;
    this.data = options.data;
    this.state = { start: 0, limit: 10};
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
     page     : '#pagination li a',
     checkAll : '#all',
     check    : 'td input',
     delete   : '.page button'

  },

  events: {
    'change @ui.pageLimit': 'changeLimit',
    'click @ui.page'      : 'changePage',
    'click @ui.checkAll'  : 'checkAll',
    'click @ui.check'     : 'check',
    'click @ui.delete'    : 'delete'
  },
 
  changeLimit(e){
      //重置列表内容
      this.state.limit = $('.page select').val();
      this.state.start = 0;

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
         $('.pagination').html('<li class="disabled"><a>&laquo;</a></li>');

         for(let i=0;i<num;i++){
            $('.pagination').append('<li><a href="#colors?page='+(i+1)+'">'+(i+1)+'</a></li>');
         }
         
         $('.pagination').append('<li><a>&raquo;</a></li>');
         
         var $$=$('.pagination').children();   
         $$.removeClass('active');
         $$.eq(1).addClass('active');
         $$.length=3 ? $$.last().addClass('disabled') : $$.last().removeClass('disabled');
      }
  },

  changePage(e){
    var $$=$('.pagination').children();
    if(($(e.target).text()==$$.eq(0).text())&&(!$$.eq(0).hasClass('disabled'))){
       this.page-=1;
    }else if(($(e.target).text()==$$.last().text())&&(!$$.last().hasClass('disabled'))){
       this.page+=1;
    }else if(($(e.target).text()==$$.eq(0).text())&&($$.eq(0).hasClass('disabled'))){
       this.page=1;
    }else if(($(e.target).text()==$$.last().text())&&($$.last().hasClass('disabled'))){
       this.page=$$.length-2;
    }
    else{
      this.page = parseInt($(e.target).text());
    }
     
     this.state.start = (this.page-1)*this.state.limit;
     
     let filtered = _.chain(this.data)
            .drop(this.state.start)
            .take(this.state.limit)
            .value();

          this.filteredCollection = new Collection(filtered);

          this.collectionView = new CollectionView({
             collection: this.filteredCollection
          });
     this.list.show(this.collectionView);
      
     $$.removeClass('active');
     $$.eq(this.page).addClass('active');
     this.page==1 ? $$.eq(0).addClass('disabled') : $$.eq(0).removeClass('disabled');
     this.page==($$.length-2) ? $$.last().addClass('disabled') : $$.last().removeClass('disabled');
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
  },
  delete(){
    /* let arr=$('td input');
     var a=[];
     for(var i=0;i<arr.size();i++){
         if(arr.eq(i).prop('checked')==true){
             a.push(arr.eq(i));
             // alert(JSON.stringify(this.data[i]));
         }
     }
     if(a.length==0){
       alert('qingxuanze');
     }*/
      
      // alert(typeof this.collection.model);
     // this.model.destroy();
  }


});



























/*


import _ from 'lodash';
import $ from 'jquery';
import {LayoutView} from 'backbone.marionette';
import CollectionView from './content/collection-view';
import {Collection} from 'backbone';
import template from './layout-template.hbs';


export default LayoutView.extend({
  template: template,
  id:'list',
  className: 'check-list check--index',

  regions: {
    list: '.check__list'
  },

  initialize(options = {}) {
    this.page=options.page;
    this.data=options.data;
    this.state = { start: 0, limit: 10};
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
     page   : '#pagination li a'
  },

  events: {
    'change @ui.pageLimit': 'changeLimit',
    'click @ui.page'      : 'changePage'
  },

  changeLimit(e){
      //重置列表内容
      this.state.limit=$('.page select').val();
      // this.state.start = (this.page - 1) * this.state.limit;
      this.state.start = 0;

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
         $('.pagination').html('<li class="disabled"><a>&laquo;</a></li>');
         // $('.pagination').append('<li class="disabled"><a>&laquo;</a></li>');

         for(let i=0;i<num;i++){
            $('.pagination').append('<li><a href="#colors?page='+(i+1)+'">'+(i+1)+'</a></li>');
         }
         
         $('.pagination').append('<li><a>&raquo;</a></li>');
         
         var $$=$('.pagination').children();   //位置不同 $('.pagination').children(); 的内容也不同
         $$.removeClass('active');
         $$.eq(1).addClass('active');
         $$.length=3 ? $$.last().addClass('disabled') : $$.last().removeClass('disabled');
      }
  },

  changePage(e){
    var $$=$('.pagination').children();
    if(($(e.target).text()==$$.eq(0).text())&&(!$$.eq(0).hasClass('disabled'))){
       this.page-=1;
    }else if(($(e.target).text()==$$.last().text())&&(!$$.last().hasClass('disabled'))){
       this.page+=1;
    }else if(($(e.target).text()==$$.eq(0).text())&&($$.eq(0).hasClass('disabled'))){
       this.page=1;
    }else if(($(e.target).text()==$$.last().text())&&($$.last().hasClass('disabled'))){
       this.page=$$.length-2;
    }
    else{
      this.page=parseInt($(e.target).text());
    }
     
     this.state.start=(this.page-1)*this.state.limit;
     
     //设置列表内容
     let filtered = _.chain(this.data)
        .drop(this.state.start)
        .take(this.state.limit)
        .value();

      this.filteredCollection = new Collection(filtered);

      this.collectionView = new CollectionView({
         collection: this.filteredCollection
      });

      this.list.show(this.collectionView);

      //
      $$.removeClass('active');
      $$.eq(this.page).addClass('active');
      this.page==1 ? $$.eq(0).addClass('disabled') : $$.eq(0).removeClass('disabled');
      this.page==($$.length-2) ? $$.last().addClass('disabled') : $$.last().removeClass('disabled');
  }


});



*/