import _ from 'lodash';
import $ from 'jquery';
import {LayoutView} from 'backbone.marionette';
import CollectionView from '../content/collection-view';
import {Collection} from 'backbone';
import template from './template.hbs';


export default LayoutView.extend({
  template: template,
  el:'.page',
 

  initialize(options = {}) {
    this.state = { start: 0, limit: 10};
    this.page=options.page;
    this.state.start = (options.page - 1) * this.state.limit;
    this.data=options.data;
    // alert(JSON.stringify(this.data));
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
    // alert(total+ current+ pages+ prev+ next );
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
         $('.pagination').html('');
         $('.pagination').append('<li class="disabled"><a>&laquo;</a></li>');

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

