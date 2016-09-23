import _ from 'lodash';
import $ from 'jquery';
import {LayoutView} from 'backbone.marionette';
import CollectionView from './content/collection-view';
import {Collection} from 'backbone';
import CollectionUpdate from './collection';  //
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
      // this.state.start = (this.page - 1) * this.state.limit;
      this.state.start = 0;

      this.onBeforeRender();
      this.onAttach();
      
      //重置页码数
      let num = Math.ceil(this.data.length / this.state.limit);
      
      if($('.pagination').children().length!=(num+2)){
         $('.pagination').html('');
         $('.pagination').append('<li class="disabled"><a>&laquo;</a></li>');
         for(let i=0;i<num;i++){
            $('.pagination').append('<li><a href="#admin/userList">'+(i+1)+'</a></li>');
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
     this.onBeforeRender();
     this.onAttach();
      
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

  createAjax(urlData, done){
     let jqXHR = $.ajax({
        type: 'GET',
        url : urlData
     });

     jqXHR.done(done);

     jqXHR.fail(function(xhr, errorText, errorStatus){
        ModalService.request('alert', {
          title: errorText,
          text : '请求连接失败！'
        });
     });
  },

  update(e) {
    let rowData = $(e.target).parent().parent().children();
    let oldData = {     // 保存表格中的数据
       userID: rowData.eq(1).html(),
       name: rowData.eq(2).html(),
       className: rowData.eq(4).html(),
       major: rowData.eq(3).html(),
       studentId: rowData.eq(5).html()
    }; 
    let da = {    
       userID: rowData.eq(1).html(),
       name: rowData.eq(2).html(),
       className: rowData.eq(4).html(),
       major: rowData.eq(3).html(),
       studentId: rowData.eq(5).html()
    };

    $('div.application__overlay').on('change', function(e) {
      if($(e.target).val() === '') {
        if(!$(e.target).parent().hasClass('has-error')) {
           $(e.target).parent().addClass('has-error');
           $(e.target).next().attr('class', 'glyphicon glyphicon-remove form-control-feedback');
           $(e.target).parent().after('<span class="help-block">信息不能为空！</span>');
           // $('div.modal-footer .btn-primary').addClass('disabled');
        }
      } else {
        if($(e.target).parent().hasClass('has-error')) {
           $(e.target).parent().removeClass('has-error');
           $(e.target).next().attr('class', 'glyphicon glyphicon-ok form-control-feedback');
           $(e.target).parent().next().remove();
        }
        da[$(e.target).attr('name')] = $(e.target).val();
      }
      // for(let i = 0; i < $('.modal-body span').length; i++){
      //   if($('.modal-body span').eq(i).hasClass('help-block')){
      //     $('div.modal-footer .btn-primary').addClass('disabled');
      //     break;
      //   }
      // }
    });
    

    ModalService.request('confirm', {
      title : '修改用户信息',
      text: '<form class="ud">'
            + '<div class="form-group input-group has-feedback"><span class="input-group-addon">*用户名ID</span><input type="text" name="userID" class="form-control" value="'+rowData.eq(1).html()+'" disabled><span class="glyphicon glyphicon-ok form-control-feedback"></span></div>'
            + '<div class="form-group input-group has-feedback"><span class="input-group-addon">*姓名</span><input type="text" name="name" class="form-control" value="'+rowData.eq(2).html()+'"><span class="glyphicon glyphicon-ok form-control-feedback"></span></div>'
            + '<div class="form-group input-group has-feedback"><span class="input-group-addon">*专业</span><input type="text" name="major" class="form-control" value="'+rowData.eq(3).html()+'"><span class="glyphicon glyphicon-ok form-control-feedback"></span></div>'
            + '<div class="form-group input-group has-feedback"><span class="input-group-addon">*班级</span><input type="text" name="className" id="nihao" class="form-control" value="'+rowData.eq(4).html()+'"><span class="glyphicon glyphicon-ok form-control-feedback"></span></div>'
            + '<div class="form-group input-group has-feedback"><span class="input-group-addon">*学号</span><input type="text" name="studentId" class="form-control" value="'+rowData.eq(5).html()+'"><span class="glyphicon glyphicon-ok form-control-feedback"></span></div>'
            + '</form>'
    }).then(confirmed => {
      if (!confirmed) {
        return;
      } else {
        for(let i in oldData){
           if(da[i] !== oldData[i]){
              let jqXHR = $.ajax({
                 type: 'GET',
                 url: '/erp/userManager/updateApprovedUserInfo.do',
                 data: da
              });

              jqXHR.done(function(response) {
                 if(response.status === 1) {
                    for(let i in da){
                      switch(i){
                        case 'userID'   : rowData.eq(1).html(da[i]);
                                          console.log('userID'+rowData.eq(1).html());
                                          break;
                        case 'name'     : rowData.eq(2).html(da[i]);
                                          console.log('name'+rowData.eq(2).html());
                                          break;
                        case 'major'    : rowData.eq(3).html(da[i]);
                                          console.log('major'+rowData.eq(3).html());
                                          break;
                        case 'className': rowData.eq(4).html(da[i]);
                                          console.log('className'+rowData.eq(4).html());
                                          break;
                        case 'studentId': rowData.eq(5).html(da[i]);
                                          console.log('studentId'+rowData.eq(5).html());
                                          break;
                      }
                    }
                 }
              });

              jqXHR.fail(function(xhr, errorText, errorStatus) {
                 ModalService.request('alert', {
                    title : errorText,
                    text: '请求连接失败！'
                 });
              });
              
              return;
           }
        }
      }
    });   
  },

  delete(e) {
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
          let url = '/erp/userManager/deleteApprUser.do?userId='+deleteId;
          
          let index;

          function done(response){
             ModalService.request('alert', {
                title : '',
                text: response.message
             });
             if(response.status === 1){
               for(let i=0;i<$('tbody tr').length;i++) {  
                 $('tbody tr').eq(i).children().eq(1).html() === agreeId ? index = i :'';       
               }
               $('tbody').get(0).deleteRow(index);
               console.log('删除了：'+ index);
             }
          }
          this.createAjax(url, done);
        }   
    });     
  },

  deleteMore(e) {
    let arr = [];    // 保存要删除的  userId
    let index = [];  // 保存要删除的 tr 的索引

    for(let i=0; i<$('tbody input').length; i++) {
       $('tbody input').eq(i).prop('checked') === true ? arr.push($('tbody').children().eq(i).children().eq(1).html()) : '';       
       $('tbody input').eq(i).prop('checked') === true ? index.push(i) : '';       
    }
   
    if(arr.length === 0) {
      ModalService.request('alert', {
         title : '',
         text: '请选择要删除的用户！'
      });
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
           let url = '/erp/userManager/deleteBatchApprUsers.do?userIds='+arr;

           function done(response){
              ModalService.request('alert', {
                 title : '',
                 text: response.message
              });
              if(response.status === 1){ //删除成功
                 for(let i=0; i < index.length; i++){
                    $('tbody').get(0).deleteRow(index[i]-i);
                    console.log('删除了：'+index[i]);
                 }
              }
           }
           this.createAjax(url, done);
         }    
       });
     }
   }
  
});
