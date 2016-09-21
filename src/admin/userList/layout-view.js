import _ from 'lodash';
import $ from 'jquery';
import {LayoutView} from 'backbone.marionette';
import CollectionView from './content/collection-view';
import {Collection} from 'backbone';
import template from './layout-template.hbs';
import ModalService from '../../component/modal/service';

export default LayoutView.extend({
  template: template,
  className: 'user-list user--index',

  regions: {
    list: '.users__list'
  },

  initialize(options = {}) {
    this.collection = options.collection;
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
     pageLimit : '#pageLimit',
     page      : '#pagination li a',
     checkAll  : '#all',
     check     : 'td input',
     update    : '.update',
     delete    : '.delete',
     deleteMore: '.btn',
     ok        : '.modal-footer button'
  },

  events: {
    'change @ui.pageLimit' : 'changeLimit',
    'click @ui.page'       : 'changePage',
    'click @ui.checkAll'   : 'checkAll',
    'click @ui.check'      : 'check',
    'click @ui.update'     : 'update',
    'click @ui.delete'     : 'delete',
    'click @ui.deleteMore' : 'deleteMore',
    'submit @ui.ok'         : 'ok'
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

  changePage(e) {
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

  checkAll(e) {
     $('#all').prop('checked') === true ? 
     $('td input').prop('checked', true) : 
     $('td input').prop('checked', false);
  },

  check(e) {
     $(e.target).prop('checked') === true ? 
     $(e.target).prop('checked', true) : 
     $(e.target).prop('checked', false);
  },

  update(e) {
    var da = {};
    $('div.application__overlay').on('change', function(e){
      da[$(e.target).attr('name')] = $(e.target).val();
      // da.push($(e.target).val());    
    });

    let rowData = $(e.target).parent().parent().children();

    ModalService.request('confirm', {
      title : '修改用户信息',
      text: '<form class="ud">'
            + '<div class="form-group input-group"><span class="input-group-addon">*用户名ID</span><input type="text" name="userId" class="form-control" value="'+rowData.eq(1).html()+'" disabled></div>'
            + '<div class="form-group input-group"><span class="input-group-addon">*姓名</span><input type="text" name="userName" class="form-control" value="'+rowData.eq(2).html()+'"></div>'
            + '<div class="form-group input-group"><span class="input-group-addon">*专业</span><input type="text" name="major" class="form-control" value="'+rowData.eq(3).html()+'"></div>'
            + '<div class="form-group input-group"><span class="input-group-addon">*班级</span><input type="text" name="class" id="nihao" class="form-control" value="'+rowData.eq(4).html()+'"></div>'
            + '<div class="form-group input-group"><span class="input-group-addon">*学号</span><input type="text" name="studentId" class="form-control" value="'+rowData.eq(5).html()+'"></div>'
            + '</form>'
    }).then(confirmed => {
      if (!confirmed) {
        return;
      } else {
         let updateId = rowData.eq(1).html();
         let jqXHR = $.ajax({
            type: 'GET',
            url: '/userManagerController/getUserList.do',
            data: da
         });

         jqXHR.done(function(response){
            alert(updateId + ' update');
            alert(da.userName);
            // alert(response[0]['data'][1]['userId']);
         });

         jqXHR.fail(function(xhr, errorText, errorStatus){
            alert('there is a error in updata');
         });
      }
    });   
  },

  delete(e){
    let rowData = $(e.target).parent().parent().children();
    let deleteId;
    ModalService.request('confirm', {
      title : '',
      text: '是否删除 ID为'+ rowData.eq(1).html() +'、用户名为'+ rowData.eq(2).html() +' 的用户？'
    }).then(confirmed => {
        if (!confirmed) {
          return;
        } else {
            deleteId = rowData.eq(1).html();
        } 
        
        let jqXHR = $.ajax({
            type: 'GET',
            // url: '/userManagerController/getUserList.do',
            url: '/erp/userManager/deleteApprUser.do',
            data: deleteId
        });

        jqXHR.done(function(response) {
            alert(deleteId + ' delete');   
        });

        jqXHR.fail(function(xhr, errorText, errorStatus) {
            alert('there is a error in delete');
        });
     
    });     
  },

  deleteMore(e){
    let arr = [];    // 保存要删除的  userId

    for(let i=0;i<$('tbody input').length;i++) {
       $('tbody input').eq(i).prop('checked') === true ? arr.push($('tbody').children().eq(i).children().eq(1).html()) : '';       
    }

    if(arr.length === 0) {
       alert('0');
       return;
    } else {
       let rowData = $(e.target).parent().parent().children();
       ModalService.request('confirm', {
         title : '',
         text: '是否删除所有选中用户？'
       }).then(confirmed => {
         if (!confirmed) {
           return;
         } else {
           let jqXHR = $.ajax({
               type: 'GET',
               url: '/userManagerController/getUserList.do',
               // url: 'http://172.22.1.159:8080/erp/userManager/deleteBatchApprUsers.do',
               data: arr
           });

           jqXHR.done(function(response) {
               alert(arr + ' delete');
           });

           jqXHR.fail(function(xhr, errorText, errorStatus) {
               alert('there is a error in delete');
           });
         }    
       });
     }
   }
  
});
