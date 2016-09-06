import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import $ from 'jquery';
import {Model} from 'backbone';
import ModalService from '../../../component/modal/service';
// import houseBuild from '../../../component/popUp/houseBuild/view.js';

export default ItemView.extend({
    template: template,
    className: 'status',
    
    initialize(options={}){
        this.model = new Model(options);
    },

    ui: {
        btnInquire: '.btnInquire',
        houseBuild: '.build',
        houseRent: '.rent'
    },

    events:{
        'mouseover @ui.btnInquire': 'moveIn',
        'mouseout @ui.btnInquire': 'moveOut'
    },

    moveIn (e) {
        // test
        ModalService.request('confirm', {
          title : '新建厂房',
          text  : '这里是测试'
        }).then(confirmed => {
          if (!confirmed) {
            return;
          }
        });

        let $this = $(e.target);
        $this.find('.btn-hover').css('display', 'block');
    },

    moveOut (e) {
        let $this=$(e.target);
        $this.find('.btn-hover').css('display', 'none');  
    }

});
