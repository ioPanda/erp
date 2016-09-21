import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import $ from 'jquery';
import {Model} from 'backbone';
import ModalService from '../../../component/modal/service';

export default ItemView.extend({
    template: template,
    className: 'house-status',
    
    initialize(options={}){
        this.model = new Model(options);
    },

    ui: {
        btnInquire: '.btnInquire'
    },

    events:{
        'mouseenter @ui.btnInquire': 'moveIn',
        'mouseleave @ui.btnInquire': 'moveOut'
    },
    
    moveIn (e) {
        // ModalService.request('houseBuild');
         // ModalService.request('confirm');

        let $this = $(e.target);
        $('.btn-hover').css('display', 'none');
        $this.find('.btn-hover').css('display', 'block');
    },

    moveOut (e) {
        let $this=$(e.target);
        $this.find('.btn-hover').css('display', 'none');
    }

});
