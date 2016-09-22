import _ from 'lodash';
import $ from 'jquery';
import {LayoutView} from 'backbone.marionette';
import CollectionView from './content/collection-view';
import {Collection} from 'backbone';
import template from './layout-template.hbs';
import ModalService from '../../component/modal/service';

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
     page      : '.pagination li a',
     details   : '.glyphicon-plus',
     delete    : '.delete',
     addHistroy: '.addHistroy'
  },

  events: {
    'change @ui.pageLimit': 'changeLimit',
    'click @ui.page'      : 'changePage',
    'click @ui.details'   : 'toggleDetails',
    'click @ui.delete'    : 'delete',
    'click @ui.addHistroy': 'addHistroy'
  },

  changeLimit(e) {
      //重置列表内容
      this.state.limit = $('.page select').val();
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
      
      if($('.pagination').children().length != (num+2)){
         $('.pagination').html('');
         $('.pagination').append('<li class="disabled"><a>&laquo;</a></li>');
         for(let i=0; i<num; i++){
            $('.pagination').append('<li><a href="#colors?page='+(i+1)+'">'+(i+1)+'</a></li>');
         }
         $('.pagination').append('<li><a>&raquo;</a></li>');
         
         $('.pagination').children().removeClass('active');
         $('.pagination').children().eq(1).addClass('active');
         $('.pagination').children().length=3 ? $('.pagination').children().last().addClass('disabled') : '';
      }

  },

  changePage(e) {
    var $$ = $('.pagination').children();
    if(($(e.target).text() === $$.eq(0).text())&&(!$$.eq(0).hasClass('disabled'))){
       this.page -= 1;
    }else if(($(e.target).text() === $$.last().text())&&(!$$.last().hasClass('disabled'))){
       this.page += 1;
    }else if(($(e.target).text() === $$.eq(0).text())&&($$.eq(0).hasClass('disabled'))){
       this.page = 1;
    }else if(($(e.target).text() === $$.last().text())&&($$.last().hasClass('disabled'))){
       this.page = $$.length-2;
    }
    else{
      this.page = parseInt($(e.target).text());
    }
     
     this.state.start = (this.page-1) * this.state.limit;
     
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
      
     $$.removeClass('active');
     $$.eq(this.page).addClass('active');
     this.page === 1 ? $$.eq(0).addClass('disabled') : $$.eq(0).removeClass('disabled');
     this.page === ($$.length-2) ? $$.last().addClass('disabled') : $$.last().removeClass('disabled');
  },
  
  createAjax(urlData, done){
    let jqXHR = $.ajax({
      type: 'GET',
      url : urlData
    });

    jqXHR.done(done);

    jqXHR.fail(function(xhr, errorText, errorStatus){
       ModalService.request('alert', {
          title : errorText,
          text  : '请求连接失败！'
       });
    });
  },

  toggleDetails(e) {
    let $this = $(e.target).parent().parent();
    let $after = $(e.target).parent().parent().next().next();
    let $next = $this.nextUntil('.item');
    
    $next.slideToggle('slow');

    $(e.target).toggleClass('glyphicon-minus');
    
    let groupName = $(e.target).parent().next().html();
    
    if($(e.target).hasClass('glyphicon-minus')){
       let url ='/erp/gameGroupManager/findGameGroupMemberStatusByGroupName.do?groupName='+groupName;
       let removeData = $this.next().nextUntil('.item');
       
       removeData.remove();

       function done(response){
         let data = response.data;

         if(data.length){
            for(let i = 0; i<data.length; i++){
              $after.before('<tr class="group__item details details-body"></tr>');

              $after.prev().append('<td colspan="3">'+data[i].userUnique+'</td>');
         
              if(data[i].currentPeriod > data[i].periodsOfOneYear){
                 console.log(Math.ceil(data[i].currentPeriod/data[i].periodsOfOneYear));
                 if(Math.ceil(data[i].currentPeriod/data[i].periodsOfOneYear) > response.data.year){
                     $after.prev().append('<td colspan="2">'+'当前：第'+Math.ceil(data[i].currentPeriod/data[i].periodsOfOneYear)+'年 第'+data[i].currentPeriod%data[i].periodsOfOneYear+'期</td>');
                 } else {
                     $after.prev().append('<td colspan="2">'+'当前：第'+Math.ceil(data[i].currentPeriod/data[i].periodsOfOneYear)+'年 第'+data[i].currentPeriod%data[i].periodsOfOneYear+'期 <a href="javascript:;">推进下一周期</a></td>')
                 }
              } else {
                 $after.prev().append('<td colspan="2">游戏进行中</td>');
              }

              data[i].status === -1 ? $after.prev().append('<td>已结束</td>') : $after.prev().append('<td>进行中/<a href="javascript:;">结束运营</a></td>');

              data[i].finishAdFlag === 1 ? $after.prev().append('<td>广告以投放</td>') : $after.prev().append('<td><a href="javascript:;">结束投放广告</a></td>');

              data.finishOrderFlag === 1 ? $after.prev().append('<td>已完成订单选择</td>') : $after.prev().append('<td><a href="javascript:;">结束订单选择</a></td>');               
            }
         }
       }

       this.createAjax(url, done);   
    }
  },

  delete(e) {
     let rowData = $(e.target).parent().parent().children();
     ModalService.request('confirm', {
       title : '',
       text: '确定删除'+ rowData.eq(1).html() +'游戏组？删除后将结束游戏！' 
     }).then(confirmed => {
       if (!confirmed) {
         return;
       } else {
         let deleteId = rowData.eq(1).html();
         let url = '/erp/gameGroupManager/deteleGameGroup.do?groupName='+deleteId;

         function done(response) {
            let index;
            ModalService.request('alert', {
               title : '',
               text: response.message
            });
            if(response.status === 1) {
               for(let i=0;i<$('tbody tr').length;i++) {  
                 $('tbody tr').eq(i).children().eq(1).html() === deleteId ? index = i :'';       
               }
               $('tbody').get(0).deleteRow(index);
               console.log('删除了：'+ index);
            }
         }

         this.createAjax(url, done);
       }
     });     
  },

  addHistroy(e) {
    let rowData = $(e.target).parent().parent().children();
    ModalService.request('confirm', {
       title : '',
       text: '确定将'+ rowData.eq(1).html() +'游戏组加入历史记录？' 
    }).then(confirmed => {
       if (!confirmed) {
         return;
       } else { 
         let deleteId = rowData.eq(1).html();
         
         let jqXHR = $.ajax({
             type: 'GET',
             url: '/userManagerController/getUserList.do',
             data: deleteId
         });

         jqXHR.done(function(response) {
             alert(deleteId + ' addHistory');
         });

         jqXHR.fail(function(xhr, errorText, errorStatus) {
             alert('there is a error in addHistory');
         });
       }
    });     
  }

});
